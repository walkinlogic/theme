import frappe
from frappe import _

# app/boot/boot_session.py

def boot_session(bootinfo):
    # Add custom global values to bootinfo
    
    if frappe.session.user != 'Guest' and frappe.session.user != 'Administrator':
        user = frappe.session.user
        default_company = frappe.db.get_value('User Permission', {
            'user': user,
            'allow': 'Company'
        }, 'for_value')
        app_logo = frappe.db.get_value('Company', {
            'name': default_company
        },'custom_logo')
        bootinfo['app_logo'] = app_logo
        # bootinfo['comp_name'] = default_company
        if app_logo:
            bootinfo['app_logo_url'] = app_logo
            bootinfo['my_company'] = default_company