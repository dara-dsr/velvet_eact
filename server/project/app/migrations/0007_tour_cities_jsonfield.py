import json
import re

import django.db.models.deletion
from django.db import migrations, models


def parse_city_to_json(apps, schema_editor):
    Tour = apps.get_model('app', 'Tour')
    for tour in Tour.objects.all():
        raw = tour.city.strip()
        parts = re.split(r'\s*[→•]\s*', raw)
        cities = [p.strip() for p in parts if p.strip()]
        # cities field is still CharField at this point, so store raw JSON string
        tour.cities = json.dumps(cities, ensure_ascii=False)
        tour.save(update_fields=['cities'])


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_tour_cities'),
    ]

    operations = [
        # Step 1: populate cities as JSON string while field is still CharField
        migrations.RunPython(parse_city_to_json, migrations.RunPython.noop),
        # Step 2: change field type to JSONField — SQLite already has valid JSON text
        migrations.AlterField(
            model_name='tour',
            name='cities',
            field=models.JSONField(default=list, blank=True),
        ),
    ]
