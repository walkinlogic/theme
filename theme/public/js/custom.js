var invalidfields = [];
var isCustomForm = 0;
let basedistrict;
let thatfilters;
frappe.views.ListView.prototype.setup_columns = function () {

    // setup columns for list view
    this.columns = [];

    const get_df = frappe.meta.get_docfield.bind(null, this.doctype);

    // 1st column: title_field or name
    if (this.meta.title_field) {
        this.columns.push({
            type: "Subject",
            df: get_df(this.meta.title_field),
        });
    } else {
        this.columns.push({
            type: "Subject",
            df: {
                label: __("ID"),
                fieldname: "name",
            },
        });
    }

    this.columns.push({
        type: "Tag",
    });

    // 2nd column: Status indicator
    if (frappe.has_indicator(this.doctype)) {
        // indicator
        this.columns.push({
            type: "Status",
        });
    }

    const fields_in_list_view = this.get_fields_in_list_view();
    // Add rest from in_list_view docfields
    this.columns = this.columns.concat(
        fields_in_list_view
            .filter((df) => {
                if (frappe.has_indicator(this.doctype) && df.fieldname === "status") {
                    return false;
                }
                if (!df.in_list_view) {
                    return false;
                }

                return df.fieldname !== this.meta.title_field;
            })
            .map((df) => ({
                type: "Field",
                df,
            }))
    ); 
    if (this.list_view_settings.fields) {
        this.columns = this.reorder_listview_fields();
    }

    // limit max to 8 columns if no total_fields is set in List View Settings
    // Screen with low density no of columns 4
    // Screen with medium density no of columns 6
    // Screen with high density no of columns 8
    let total_fields = 600;

    // if (window.innerWidth <= 1366) {
    //     total_fields = 4;
    // } else if (window.innerWidth >= 1920) {
    //     total_fields = 10;
    // }

    this.columns = this.columns.slice(0, this.list_view_settings.total_fields || total_fields);

    if (
        !this.settings.hide_name_column &&
        this.meta.title_field &&
        this.meta.title_field !== "name"
    ) {
        this.columns.push({
            type: "Field",
            df: {
                label: __("ID"),
                fieldname: "name",
            },
        });
    }

}

frappe.views.Container.prototype.add_page = function (label) {
    var page = $('<div class="content-page-container ' + label.replaceAll(/\s/g, '') + '"></div>')
        .attr("id", "page-" + label.replaceAll(/\s/g, ''))
        .attr("data-page-route", label)
        .hide()
        .appendTo(this.container)
        .get(0);
    page.label = label;
    frappe.pages[label] = page;

    return page;
}
function toggleFullScreen() {
    var elem = document.documentElement;
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {
        // Enter fullscreen mode
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { // Firefox
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // IE/Edge
            elem.msRequestFullscreen();
        }
    }

    $(".bxfullscreen").addClass("d-none");
    $(".exitfullscreen").removeClass("d-none");
    localStorage.setItem('screen', 'fullwidth');
}
frappe.views.BaseList.prototype.setup_page = function () {
    this.page = this.parent.page;
    this.$page = $(this.parent);
    !this.hide_card_layout && this.page.main.addClass("frappe-card");
    this.page.page_form.removeClass("row").addClass("flex");
    this.hide_page_form && this.page.page_form.hide();
    this.hide_sidebar && this.$page.addClass("no-list-sidebar");
    this.setup_page_head();

}
frappe.ui.Page.prototype.add_main_section = async function () {

    $(frappe.render_template("page", {})).appendTo(this.wrapper);
    if (this.single_column) {
        // nesting under col-sm-12 for consistency
        this.add_view(
            "main",
            `<div class="row layout-main">   
                <div class="col-md-12 layout-main-section-wrapper">
                    <div class="layout-main-section"></div>
                    <div class="layout-footer hide"></div>
                </div>
            </div>`
        );
    } else {
        this.add_view(
            "main",
            `
            <div class="row layout-main">  
                <div class="col-lg-2  layout-side-section"></div>
                <div class="col layout-main-section-wrapper">
                    <div class="layout-main-section"></div>
                    <div class="layout-footer hide"></div>
                </div>
            </div>
        `
        );
    }

    this.setup_page();
}



frappe.ui.form.Layout.prototype.make = function () {


    if (!this.parent && this.body) {
        this.parent = this.body;
    }


    if (this.frm && typeof this.frm != 'undefined') {
        if (typeof this.frm.meta != "undefined" && typeof this.frm.meta.is_custom_form != "undefined" && this.frm.meta.is_custom_form == 1) {
            isCustomForm = 1;
            this.wrapper = $('<div class="form-layout custom-form-layout">').appendTo(this.parent);

        } else {
            isCustomForm = 0;
            this.wrapper = $('<div class="form-layout">').appendTo(this.parent);

        }
    } else {
        isCustomForm = 0;
        this.wrapper = $('<div class="form-layout">').appendTo(this.parent);

    }
    this.message = $('<div class="form-message hidden"></div>').appendTo(this.wrapper);
    this.page = $('<div class="form-page"></div>').appendTo(this.wrapper);

    if (!this.fields) {
        this.fields = this.get_doctype_fields();

    }

    if (this.is_tabbed_layout()) {
        this.setup_tabbed_layout();
    }

    this.setup_tab_events();
    // this.frm && this.setup_tooltip_events();
    this.render();


}
frappe.ui.form.ControlText = class ControlText extends frappe.ui.form.ControlData {
    static html_element = "textarea";
    static horizontal = false;
    make_wrapper() {
        super.make_wrapper();
        this.$wrapper.find(".like-disabled-input").addClass("for-description");
    }
    make_input() {
        super.make_input();
        this.$input.css({ height: "146px" });
        if (this.df.max_height) {
            this.$input.css({ "max-height": this.df.max_height * 3 });
        }
    }
};

frappe.ui.form.ControlSmallText = class ControlSmallText extends frappe.ui.form.ControlText {
    make_input() {

        super.make_input();
        this.$input.css({ height: "146px" });
        if (this.df.columns > 0) {

            this.$input.closest('.frappe-control').addClass("col-sm-" + this.df.columns);
        }
    }
};

frappe.ui.form.ControlInput.prototype.set_max_width = function () {

    if (this.constructor.horizontal) {
        this.$wrapper.addClass("input-max-width");
    }
    if (this.df.columns > 0) {
        this.$wrapper.addClass("col-sm-" + this.df.columns);
        this.$wrapper.closest('.form-column').addClass("d-flex-row");
        this.$wrapper.closest('form').addClass('row');
    }
}
  
$(function () {
	
	
    $(".menu-toggle").on("click", function () {
        $("body").toggleClass("sidebar-mini")
    });

     
})
 