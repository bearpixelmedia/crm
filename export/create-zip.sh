#!/bin/bash

# Create a zip file containing all CSV files and the import guide
echo "Creating CRM Data Import Package..."

# Create the zip file
zip -r white-fox-crm-data.zip . -x "*.sh" "*.md"

echo "✅ Created white-fox-crm-data.zip"
echo "📁 Contains all CSV files and import guide"
echo "📤 Ready for download and import into Google Sheets!" 