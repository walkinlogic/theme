# Copyright (c) 2024, Micromerger and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class EmployeeClockInOutTool(Document):
	@frappe.whitelist()
	def creat_emp_checkin(self):
		if len(self.employee_checkin)>0:
			for i in self.employee_checkin:
				emp = frappe.new_doc("Employee Checkin")
				emp.employee = i.employee
				emp.log_type = i.log_type
				emp.time = i.time
				emp.save()
			frappe.msgprint("Records Created")
