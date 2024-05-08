import frappe
from erpnext.setup.doctype.employee.employee import Employee, get_employee_emails
from frappe.model.naming import set_name_by_naming_series, make_autoname
from frappe.utils import getdate, cstr, today, add_months, validate_email_address
from frappe import _, scrub, throw

from erpnext.utilities.transaction_base import delete_events
from frappe.permissions import (
	add_user_permission,
	get_doc_permissions,
	has_permission,
	remove_user_permission,
	set_user_permission_if_allowed,
)

class Employee(Employee):
	# Function overide and changed
	def autoname(self):
		naming_method = frappe.db.get_value("HR Settings", None, "emp_created_by")
		if not naming_method:
			throw(_("Please setup Employee Naming System in Human Resource > HR Settings"))
		else:
			# This is custom code
			self.name = make_autoname("HRM-" + str(self.custom_abbr) + "-.####")

		self.employee = self.name