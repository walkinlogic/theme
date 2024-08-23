import frappe 
from frappe import _ 
from frappe.desk.desktop import get_desktop_page
from frappe.desk.desktop import get_workspace_sidebar_items 
import json

@frappe.whitelist()
def get_desktop_pages():
    pages = get_workspace_sidebar_items()
    pages = pages.get("pages")
    pages = [d for d in pages if not d.get('parent_page')]
    
    for row in pages:
        row_json = json.dumps(row)
        desktop_page = get_desktop_page(row_json)
        row["cards"] = desktop_page.get("cards")
        shortcuts = desktop_page.get("shortcuts")
        # pageshortcuts = []
        # for shortcut in shortcuts['items']: 
        #     if shortcut.type =='URL':
        #         shortcut.url=shortcut.url
        #     else:
        #         shortcut.url= generate_route(card) 
        #     pageshortcuts.push(shortcut) 
        # shortcuts['items'] =  pageshortcuts            
        row["shortcuts"] = shortcuts
    return pages
@frappe.whitelist(allow_guest=1)
def get_district():

    data = """Select title district_name from "tabDistrict" where name is not null order by title """ 
    data = frappe.db.sql(data, as_dict=1)

    return data

@frappe.whitelist(allow_guest=1)
def get_taluka(district):

    data = """Select title taluka_name from "tabTaluka" where name is not null and district = '%s' """ %(district)
    data = frappe.db.sql(data, as_dict=1)

    return data

@frappe.whitelist(allow_guest=1)
def get_union_council(taluka):

    data = """Select title as uc from "tabUnion Council" where name is not null and taluka = '%s' """ %(taluka)
    data = frappe.db.sql(data, as_dict=1)

    return data
@frappe.whitelist(allow_guest=1)
def get_years():

    data = """Select year as year_name from "tabYear" where name is not null order by start_date DESC """
    data = frappe.db.sql(data, as_dict=1)

    return data
