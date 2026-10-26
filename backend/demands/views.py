import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from .models import BookDemand

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

    # POST request:
    try:
        if request.content_type and "application/json" in request.content_type:
            data = json.loads(request.body.decode("utf-8"))
        else:
            data = request.POST.dict()
    except Exception as e:
        return JsonResponse({
            "success": False,
            "error": f"Invalid request body: {str(e)}"
        }, status=400)

    email = (data.get("email") or "").strip()
    demand_text = (data.get("demand") or data.get("demand_text") or "").strip()
    category = (data.get("category") or "other").strip().lower()
    book_title = (data.get("book_title") or data.get("title") or "").strip()

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

    # Validate category against choices
    valid_categories = dict(BookDemand.CATEGORY_CHOICES).keys()
    if category not in valid_categories:
        category = "other"

    # Save to database
    try:
        demand = BookDemand.objects.create(
            email=email,
            category=category,
            book_title=book_title[:200],
            demand_text=demand_text,
            status='new',
        )

        return JsonResponse({
            "success": True,
            "message": "Demande dyalek tssjlatt b-naja7! Ghadi n-contactiwk 3la had l-email f a9rab wa9t.",
            "demand_id": demand.id,
            "category": demand.get_category_display(),
            "created_at": demand.created_at.isoformat(),
        }, status=201)
    except Exception as e:
        return JsonResponse({
            "success": False,
            "error": f"Error saving demand: {str(e)}"
        }, status=500)


@require_http_methods(["GET"])
def health_check(request):
    return JsonResponse({
        "status": "healthy",
        "django": True,
        "demands_count": BookDemand.objects.count()
    })
