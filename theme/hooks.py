app_name = "theme"
app_title = "Theme"
app_publisher = "MHaroon"
app_description = "Theme "
app_email = "walkin.logic@gmail.com"
app_license = "mit"
# required_apps = []

# Includes in <head>
# ------------------
app_include_css = [
                    "/assets/theme/css/style.css",
                    "/assets/theme/css/loginstyle.css",
                    "/assets/theme/css/new-style.css",
                    "/assets/theme/assets/css/styles.css",
                    "/assets/theme/assets/css/loginstyle.css",
                    "/assets/theme/assets/libs/jvectormap/jquery-jvectormap.css",
                    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" 
                ]
app_include_js = [
                
         
                   "custom_desk.bundle.js",

                    #"/assets/theme/js/plugins.js",
                    #"/assets/theme/js/theme.js",
                    "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js",
                    
                    "/assets/theme/js/custom.js",
                    # "/assets/theme/js/apexcharts.bundle.js" 
                    
                    # "/assets/theme/assets/js/vendor.min.js",
                    "https://cdnjs.cloudflare.com/ajax/libs/simplebar/6.2.5/simplebar.min.js",
                    "/assets/theme/assets/js/theme/app.init.js",
                    "/assets/theme/assets/js/theme/theme.js",
                    "/assets/theme/assets/js/theme/app.min.js",
                    "/assets/theme/assets/js/theme/sidebarmenu.js",
                    "/assets/theme/assets/js/theme/feather.min.js",
                    "https://cdn.jsdelivr.net/npm/iconify-icon@1.0.8/dist/iconify-icon.min.js", 


                     "https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.6/proj4.js",
                    "https://code.highcharts.com/maps/highmaps.js",
                    "https://code.highcharts.com/stock/modules/data.js",
                    "https://code.highcharts.com/modules/marker-clusters.js",
                    "https://code.highcharts.com/modules/coloraxis.js",
                    "https://code.highcharts.com/modules/exporting.js",
                    "https://code.highcharts.com/modules/export-data.js",
                    "https://blacklabel.github.io/grouped_categories/grouped-categories.js",
                    "https://code.highcharts.com/modules/drilldown.js",
                    "https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.44.0/apexcharts.min.js",
                    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/jquery.inputmask.bundle.js',
                    'https://cdn.jsdelivr.net/npm/chart.js',

                    # "/assets/theme/js/custom_script.js",    
                ]

# include js, css files in header of web template
# web_include_css = "/assets/theme/css/theme.css"
# web_include_js = "/assets/theme/js/theme.js"

web_include_css = [
                    "/assets/theme/css/style.css",
                    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
                    "/assets/theme/dist/css/style.css", 
                    "/assets/theme/css/new-style.css" 
                ]
web_include_js = [ "website_script.js",
                    "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" 
                ]
# include js, css files in header of desk.html
# app_include_css = "/assets/theme/css/theme.css"
# app_include_js = "/assets/theme/js/theme.js"

# include js, css files in header of web template
# web_include_css = "/assets/theme/css/theme.css"
# web_include_js = "/assets/theme/js/theme.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "theme/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "theme/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "theme.utils.jinja_methods",
# 	"filters": "theme.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "theme.install.before_install"
# after_install = "theme.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "theme.uninstall.before_uninstall"
# after_uninstall = "theme.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "theme.utils.before_app_install"
# after_app_install = "theme.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "theme.utils.before_app_uninstall"
# after_app_uninstall = "theme.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "theme.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"theme.tasks.all"
# 	],
# 	"daily": [
# 		"theme.tasks.daily"
# 	],
# 	"hourly": [
# 		"theme.tasks.hourly"
# 	],
# 	"weekly": [
# 		"theme.tasks.weekly"
# 	],
# 	"monthly": [
# 		"theme.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "theme.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "theme.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "theme.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["theme.utils.before_request"]
# after_request = ["theme.utils.after_request"]

# Job Events
# ----------
# before_job = ["theme.utils.before_job"]
# after_job = ["theme.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"theme.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

#Code with error in logs
# override_whitelisted_methods = {
#  	"frappe.core.doctype.navbar_settings.navbar_settings.get_app_logo": "theme.custom_boot.custom_app_logo_url"
# }

# extend_bootinfo = "app.theme.boot_session"

# def boot_session(bootinfo):
    # bootinfo.my_global_key = "my_global_value"
 
# python module path
extend_bootinfo = "theme.boot_session.boot_session"    