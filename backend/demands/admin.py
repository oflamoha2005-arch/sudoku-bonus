from django.contrib import admin
from .models import BookDemand

@admin.register(BookDemand)
class BookDemandAdmin(admin.ModelAdmin):
    list_display = ('email', 'category', 'short_title', 'status', 'created_at', 'short_demand')
    list_filter = ('status', 'category', 'created_at')
    search_fields = ('email', 'demand_text', 'book_title', 'admin_notes')
    list_editable = ('status',)
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
    list_per_page = 25

    fieldsets = (
        ("Client Information", {
            "fields": ("email",)
        }),
        ("Demand Details", {
            "fields": ("category", "book_title", "demand_text", "created_at", "updated_at")
        }),
        ("Fulfillment & Admin Status", {
            "fields": ("status", "admin_notes")
        }),
    )

    def short_demand(self, obj):
        text = obj.demand_text or ""
        return (text[:60] + "...") if len(text) > 60 else text
    short_demand.short_description = "Demand Preview"

    def short_title(self, obj):
        return obj.book_title or "—"
    short_title.short_description = "Title"

admin.site.site_header = "Oufella Activity Books — Admin Dashboard"
admin.site.site_title = "Oufella Demands Portal"
admin.site.index_title = "Manage Custom Book Demands"
