import json
import logging
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.core.cache import cache
from django.utils.html import strip_tags
from .models import BookDemand

logger = logging.getLogger(__name__)

def get_client_ip(request):
    """Retrieve client IP address safely, checking proxy headers."""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0].strip()
    else:
        ip = request.META.get('REMOTE_ADDR', '')
    return ip or '127.0.0.1'

@csrf_exempt
@require_http_methods(["GET", "POST", "OPTIONS"])
def submit_demand(request):
    if request.method == "OPTIONS":
        return JsonResponse({"ok": True})

    if request.method == "GET":
        count = BookDemand.objects.count()
        return JsonResponse({
            "status": "online",
            "service": "Oufella Custom Book Demands API (Django)",
            "total_demands_received": count,
        })

    # SECURITY: Max body size check (64 KB) to prevent DoS via huge payload
    if len(request.body) > 65536:
        return JsonResponse({
            "success": False,
            "error": "Request body too large. Max 64KB."
        }, status=413)

    # SECURITY: Rate Limiting / Anti-Spam (Max 5 requests per 10 minutes per IP)
    client_ip = get_client_ip(request)
    rate_limit_key = f"rl_demands_{client_ip}"
    submission_count = cache.get(rate_limit_key, 0)
    if submission_count >= 5:
        return JsonResponse({
            "success": False,
            "error": "Trop de requêtes. Veuillez patienter quelques minutes avant de renvoyer une nouvelle demande."
        }, status=429)

    # Parse request data
    try:
        if request.content_type and "application/json" in request.content_type:
            data = json.loads(request.body.decode("utf-8"))
        else:
            data = request.POST.dict()
    except Exception:
        return JsonResponse({
            "success": False,
            "error": "Format de requête invalide (JSON attendu)."
        }, status=400)

    # SECURITY: Anti-bot honeypot check
    if data.get("website") or data.get("hp_field") or data.get("honeypot"):
        return JsonResponse({
            "success": True,
            "message": "Demande enregistrée avec succès."
        }, status=200)

    # Sanitize inputs (strip tags to prevent Stored XSS)
    email = (data.get("email") or "").strip()
    raw_demand = (data.get("demand") or data.get("demand_text") or "").strip()
    demand_text = strip_tags(raw_demand)
    category = (data.get("category") or "other").strip().lower()
    book_title = strip_tags((data.get("book_title") or data.get("title") or "").strip())

    # Validation
    if not email:
        return JsonResponse({
            "success": False,
            "error": "L-Email darouri! Please provide your email address."
        }, status=400)

    try:
        validate_email(email)
    except ValidationError:
        return JsonResponse({
            "success": False,
            "error": "L-Email ma s7i7ch! Please enter a valid email address."
        }, status=400)

    if not demand_text:
        return JsonResponse({
            "success": False,
            "error": "Kteb l-demande dyalek! Please write what kind of book you want us to create."
        }, status=400)

    if len(demand_text) > 5000:
        return JsonResponse({
            "success": False,
            "error": "L-demande twila bzzaf! Max 5000 characters."
        }, status=400)

    # Validate category against allowed choices
    valid_categories = dict(BookDemand.CATEGORY_CHOICES).keys()
    if category not in valid_categories:
        category = "other"

    # Save to database securely
    try:
        demand = BookDemand.objects.create(
            email=email,
            category=category,
            book_title=book_title[:200],
            demand_text=demand_text,
            status='new',
        )

        # Update rate limit counter (expires in 10 minutes)
        cache.set(rate_limit_key, submission_count + 1, timeout=600)

        return JsonResponse({
            "success": True,
            "message": "Demande dyalek tssjlatt b-naja7! Ghadi n-contactiwk 3la had l-email f a9rab wa9t.",
            "demand_id": demand.id,
            "category": demand.get_category_display(),
            "created_at": demand.created_at.isoformat(),
        }, status=201)
    except Exception as e:
        logger.error(f"Error saving demand: {e}")
        # SECURITY: Do not leak internal exception details to client
        return JsonResponse({
            "success": False,
            "error": "Une erreur interne est survenue. Veuillez réessayer ultérieurement."
        }, status=500)


@require_http_methods(["GET"])
def health_check(request):
    return JsonResponse({
        "status": "healthy",
        "django": True,
        "demands_count": BookDemand.objects.count()
    })
