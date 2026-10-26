from django.db import models

class BookDemand(models.Model):
    STATUS_CHOICES = [
        ('new', 'New Request'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed & Published'),
        ('cancelled', 'Cancelled'),
    ]

    CATEGORY_CHOICES = [
        ('coloring', 'Coloring Book'),
        ('word_search', 'Word Search'),
        ('crossword', 'Crossword'),
        ('sudoku', 'Sudoku'),
        ('mazes', 'Mazes & Logic'),
        ('story', 'Story Book'),
        ('other', 'Custom Idea'),
    ]

    email = models.EmailField(
        max_length=254,
        verbose_name="Client Email",
        help_text="Email to contact the client once the book is ready"
    )
    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        default='other',
        blank=True,
        verbose_name="Book Category"
    )
    book_title = models.CharField(
        max_length=200,
        blank=True,
        default='',
        verbose_name="Suggested Title (Optional)"
    )
    demand_text = models.TextField(
        verbose_name="Demand / Request Details",
        help_text="Describe theme, age group, puzzles, special requirements"
    )
    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default='new',
        verbose_name="Status"
    )
    admin_notes = models.TextField(
        blank=True,
        default='',
        verbose_name="Internal Admin Notes"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Submitted At"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Last Updated"
    )

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Book Demand"
        verbose_name_plural = "Book Demands"

    def __str__(self):
        return f"{self.email} - {self.get_category_display()} ({self.created_at.strftime('%Y-%m-%d %H:%M')})"
