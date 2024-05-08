// Copyright (c) 2024, Micromerger and contributors
// For license information, please see license.txt

frappe.ui.form.on("Employee ClockInOut Tool", {
	refresh(frm) {

	},
	create_checkin: function(frm) {

		frm.call('creat_emp_checkin');
		
	}
 });
