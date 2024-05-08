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

//// this is running from validation app
frappe.ui.form.ControlData.prototype.setup_copy_button = function () {


    if (this.df.with_copy_button) {
        this.$wrapper
            .find(".control-input")
            .append(
                `<button class="btn action-btn">
                ${frappe.utils.icon("clipboard", "sm")}
            </button>`
            )
            .find(".action-btn")
            .click(() => {
                frappe.utils.copy_to_clipboard(this.value);

            });
    }
    // if (this.df.masking) {
    //     var mask = this.df.masking_format;
    //     console.log('mask', mask);
    //     this.$input.inputmask({ "mask": mask });
    // }

    this.$input.on("focusout", (e) => {

        let me = this;
        let df = me.df;
        let doc = me.doc;
        let errorfields = [];
        let has_errors = false;

        var validationTypes = {
            'Name': /^[a-zA-Z\s._-]+$/,
            'INT': /^[0-9]+$/,
            'PASSPORT': /^[A-Z]{2}\d{7}[A-Z]{0,1}$/,
            'FLOAT': /^[+-]?\d+(\.\d+)?$/,
            'IBAN': /^[A-Z]{2}\d{2}[A-Z\d]{1,30}$/,
            'URL': /^(https?|ftp):\/\/([A-Za-z0-9]+([A-Za-z0-9-]*[A-Za-z0-9]+)*\.)+[A-Za-z]{2,7}(:[0-9]+)?(\/.*)?$/,
            'Mobile': /^(?:\+92|0)?3[0-9]{2}[0-9]{7}$/,
            'Phone': /^(?:\+92|0)?[1-9][0-9]{1,2}[1-9][0-9]{6}$/,
            'Email': /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            'CNIC': /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/,
            'CNIC1': /^\d{5}-?\d{7}-?\d{1}$/
        };
        if (df.validation) {
            var values = this.$input.val();
            if (df.validation == 'Custom') { 
                validationTypes['Custom'] = new RegExp(df.regex.replace("\\/", "").replace("\/", "").replace("$/", "$"));
                
            }

            if (validationTypes[df.validation]) {
                var valid = validationTypes[df.validation].test(values) && values.length;

                if (!valid && values !== '') {
                    this.df.invalid = true;
                    if (this.df.reqd !== 1) {
                        this.df.reqd = 1;
                        this.df.reqds = 1;
                    }
                    has_errors = true;
                    errorfields.push(__(df.label));
                } else if (valid) {
                    this.df.invalid = false;
                    if (this.df.reqds === 1) {
                        this.df.reqd = 0;
                        this.df.reqds = 0;
                    }
                }
            } else if (df.validation == 'Date') {
                var selectedDate = new Date("2023-06-07");
                var currentDate = new Date();
                if (df.date_range == 'Past' && selectedDate > currentDate) {
                    this.df.invalid = true;
                    if (this.df.reqd !== 1) {
                        this.df.reqd = 1;
                        this.df.reqds = 1;
                    }
                    has_errors = true;
                    errorfields.push(__(df.label));
                } else if (df.date_range == 'Future' && selectedDate < currentDate) {
                    this.df.invalid = true;
                    if (this.df.reqd !== 1) {
                        this.df.reqd = 1;
                        this.df.reqds = 1;
                    }
                    has_errors = true;
                    errorfields.push(__(df.label));
                } else {
                    this.df.invalid = false;
                    if (this.df.reqds === 1) {
                        this.df.reqd = 0;
                        this.df.reqds = 0;
                    }
                }
            }

        }

        if (errorfields.length > 0 && invalidfields.length == 0) {
            var message = __("<b>Fields contains invalid value in {0}</b>", [__(doc.doctype)]);
            message = message + "<br><ul><li>" + errorfields.join("</li><li>") + "</ul>";



            frappe.msgprint({
                message: message,
                indicator: "red",
                title: __("Invalid Fields"),
            });
            this.set_invalid();

        } else {
            this.set_invalid();
        }

    });
}


let sidebar;
let public_pages;
let private_pages;
let sidebar_categories;
let all_pages;
let modules;
let setcurrentpage = 0;
let pathname = ''
let sidebar_items = {
    public: {},
    private: {},
};
current_page = {};
function setPageLinks(linksObj, page) {
	if (!linksObj) return;

	for (const items of linksObj.items) {
		if(items.links){
			for (const item of items.links) {
				const opts = {
					name: item.link_to,
					type: item.link_type,
					doctype: item.doctype,
					is_query_report: item.is_query_report
				};

				if (item.link_type.toLowerCase() == "report" && !item.is_query_report) {
					opts.doctype = item.dependencies;
				}

				const route = frappe.utils.generate_route(opts);
				if (pathname == route && modules == page.module && !setcurrentpage) {
					localStorage.setItem('current_page', page.name);
					setcurrentpage = 1;
				}
			}
		}
	}
}
	
async function getpages(all_pages){
	setcurrentpage = 0;
	
	const promises = []; 
	 for (const page of all_pages) {
        // Push the async call promise into the promises array
        promises.push(fetchPage(page));
    }

    // Await all promises to resolve concurrently
    await Promise.all(promises);

    function fetchPage(page) {
        return new Promise(async (resolve) => {
            const sr = await frappe.call({
                "method": "frappe.desk.desktop.get_desktop_page",
                args: { page: page },
                freeze: true
            });
			/* let cards = sr.message.cards;
			page.links = cards;
            setPageLinks(sr.message.cards, page); */
			let shortcuts = sr.message.shortcuts;
			page.shortcuts = shortcuts;
            setPageLinks(sr.message.shortcuts, page);

            resolve(); // Resolve the promise after async operations are done
        });
    }
	/* all_pages.forEach(async (page) => {
		const sr = await frappe.call({ "method": "frappe.desk.desktop.get_desktop_page", args: { page: page }, freeze: true });
		$currentpage = '';
		let cards = sr.message.cards;
		page.links = cards;
		setPageLinks(sr.message.cards, page);
		let shortcuts = sr.message.shortcuts;
		page.shortcuts = shortcuts;
        setPageLinks(sr.message.shortcuts, page); */
		
		/* 
		let cards = sr.message.cards;
		page.links = cards;
		$.each(cards.items, function (key, items) {
			$.each(items.links, function (key, item) {
				const opts = {
					name: item.link_to,
					type: item.link_type,
					doctype: item.doctype,
					is_query_report: item.is_query_report
				};

				if (item.link_type.toLowerCase() == "report" && !item.is_query_report) {
					opts.doctype = this.dependencies;
				}

				const route = frappe.utils.generate_route(opts);
				if (modules && pathname == route && modules == page.module) {
					localStorage.setItem('current_page', page.name);
					setcurrentpage = 1;
				}
			});
		});

		let shortcuts = sr.message.shortcuts;
		page.shortcuts = shortcuts;
		$.each(shortcuts.items, function (key, items) {
			$.each(items.links, function (key, item) {
				const opts = {
					name: item.link_to,
					type: item.link_type,
					doctype: item.doctype,
					doc_view: item.doc_view,
					is_query_report: item.is_query_report
				};

				if (item.link_type.toLowerCase() == "report" && !item.is_query_report) {
					opts.doctype = this.dependencies;
				}

				const route = frappe.utils.generate_route(opts);
				if (pathname == route && modules == page.module) {
					localStorage.setItem('current_page', page.name);
					setcurrentpage = 1;
				}
			});
		}); */
	/* }); */
}
function getsidebaritems() {


    sidebar = $(".layout-side-section-menu");

    sidebar_categories = ["My Workspaces", "Public"];


    frappe.call({
        method: "frappe.desk.desktop.get_workspace_sidebar_items",
        freeze: true,
        callback: async function (r) {

            pathname = window.location.pathname;
            all_pages = r.message.pages;

            await getpages(all_pages); 
            setTimeout(function () {
                createsidebarmenu();
            }, 3500)


            $('.avatarbody').html(frappe.avatar(frappe.session.user, "avatar-large"));
            if (frappe.session.user == undefined) {
                $('.username.welcomeback').html("Welcome back!");
            } else {
                $('.username.welcomeback').html("Welcome back, " + frappe.session.user + "!");
            }

        }
    });
}

function createsidebarmenu() {
    localStorage.setItem('all_pages', JSON.stringify(all_pages));
    all_pages.forEach((page) => {
        page.is_editable = !page.public;
    });

    public_pages = all_pages.filter((page) => page.public);
    private_pages = all_pages.filter((page) => !page.public);
    if (all_pages) {
        frappe.workspaces = {};
        for (let page of all_pages) {
            frappe.workspaces[frappe.router.slug(page.name)] = { title: page.title };
        }
        if (sidebar.find(".standard-sidebar-section")[0]) {
            sidebar.find(".standard-sidebar-section").remove();
        }

        sidebar_categories.forEach((category) => {
            let root_pages = public_pages.filter(
                (page) => page.parent_page == "" || page.parent_page == null
            );
            if (category != "Public") {
                root_pages = private_pages.filter(
                    (page) => page.parent_page == "" || page.parent_page == null
                );
            }
            root_pages = root_pages.uniqBy((d) => d.title);
            build_sidebar_section(category, root_pages);
        });

        // Scroll sidebar to selected page if it is not in viewport.

        $('.layout-side-section-menu').find(".selected").length &&
            !frappe.dom.is_element_in_viewport($('.layout-side-section-menu').find(".selected")) &&
            $('.layout-side-section-menu').find(".selected")[0].scrollIntoView();

        // $('.item-anchor').click(function () {
        //     $('.desk-sidebar-item').removeClass('selected');
        //     $(this).parent().addClass('selected');
        // })


        // reload && this.show();
    }
}

function create_sidebar_skeleton() {
    if ($(".workspace-sidebar-skeleton").length) return;

    $(frappe.render_template("workspace_sidebar_loading_skeleton")).insertBefore(sidebar);
    sidebar.addClass("hidden");
}

function prepare_sidebar(items, child_container, item_container) {
    items.forEach((item) => append_item(item, child_container));
    child_container.appendTo(item_container);
}

function build_sidebar_section(title, root_pages) {
    let sidebar_section = $('.layout-side-section-menu');

    // let $title = $(`<div class="standard-sidebar-label">
    //     <span>${frappe.utils.icon("small-down", "xs")}</span>
    //     <span class="section-title">${__(title)}<span>
    // </div>`).appendTo(sidebar_section);
    prepare_sidebar(root_pages, sidebar_section, sidebar);

    // $title.on("click", (e) => {
    //     let icon =
    //         $(e.target).find("span use").attr("href") === "#icon-small-down"
    //             ? "#icon-right-2"
    //             : "#icon-small-down";
    //     $(e.target).find("span use").attr("href", icon);
    //     $(e.target).parent().find(".sidebar-item-container").toggleClass("hidden");
    // });

    // if (Object.keys(root_pages).length === 0) {
    //     sidebar_section.addClass("hidden");
    // }

    // if (
    //     sidebar_section.find(".sidebar-item-container").length &&
    //     sidebar_section.find("> [item-is-hidden='0']").length == 0
    // ) {
    //     sidebar_section.addClass("hidden show-in-edit-mode");
    // }
}

function append_item(item, container) {

    let is_current_page =
        frappe.router.slug(item.title) == frappe.router.slug(get_page_to_show().name) &&
        item.public == get_page_to_show().public;

    item.selected = is_current_page;
    if (is_current_page) {
        current_page = { name: item.title, public: item.public };
    }

    let $item_container = sidebar_item_container(item);
    let sidebar_control = $item_container.find(".sidebar-item-control");

    add_sidebar_actions(item, sidebar_control);
    let pages = item.public ? public_pages : private_pages;

    let child_items = pages.filter((page) => page.parent_page == item.title);
    if (child_items.length > 0) {
        let child_container = $item_container.find(".sidebar-child-item");
        // child_container.addClass("hidden");
        prepare_sidebar(child_items, child_container, $item_container);
    }

    $item_container.appendTo(container);
    sidebar_items[item.public ? "public" : "private"][item.title] = $item_container;

    // if ($item_container.parent().hasClass("hidden") && is_current_page) {
    //     $item_container.parent().toggleClass("hidden");
    // }

    add_drop_icon(item, sidebar_control, $item_container);

    if (child_items.length > 0) {
        $item_container.find(".drop-icon").first().addClass("show-in-edit-mode");
    }
}

function get_page_to_show() {
    let default_page;

    if (
        localStorage.current_page &&
        all_pages.filter((page) => page.title == localStorage.current_page).length != 0
    ) {
        default_page = {
            name: localStorage.current_page,
            public: localStorage.is_current_page_public == "true",
        };
    } else if (Object.keys(all_pages).length !== 0) {
        default_page = { name: all_pages[0].title, public: true };
    } else {
        default_page = { name: "Build", public: true };
    }
    let page;

    if (frappe.get_route()) {
        page =
            (frappe.get_route()[1] == "private" ? frappe.get_route()[2] : frappe.get_route()[1]) ||
            default_page.name;
    } else {
        page =
            default_page.name;
    }
    let is_public;
    if (frappe.get_route()) {
        is_public = frappe.get_route()[1]
            ? frappe.get_route()[1] != "private"
            : default_page.public;
    } else {
        is_public = default_page.public;
    }

    return { name: page, public: is_public };
}
function get_page_to_show_active() {
    let default_page;

    if (localStorage.current_workspace) {
        default_page = localStorage.current_workspace;
    } else if (this.workspaces) {
        default_page = this.workspaces["Modules"][0].name;
    } else if (frappe.boot.allowed_workspaces) {
        default_page = frappe.boot.allowed_workspaces[0].name;
    } else {
        default_page = "Build";
    }

    let page = frappe.get_route()[1] || default_page;
    return page;
}
function sidebar_item_container(item) {

    var itemcontent = JSON.parse(item.content);
    var itemid = itemcontent[0].id;
    let current_page = localStorage.getItem('current_page');
    var activepage = '';
    var submenuactive = '';


    if (item.is_hidden == 0) {
        var submenu = '';
        var submenuitems = '';
        var subitems = [];
        var shortcuts = []
        if (item.links) {
            if (item.links.items) {
                subitems = item.links.items;
            }
        }
        if (item.shortcuts) {
            if (item.shortcuts.items) {
                shortcuts = item.shortcuts.items;
            }
        } 
        if (subitems.length > 0 || shortcuts.length > 0) {
            subitems.forEach((dmenu) => {
                const opts = {
                    name: dmenu.link_to,
                    type: dmenu.type,
                    doc_view: dmenu.doc_view,
                    doctype: dmenu.doctype,
                    is_query_report: 0
                };


                let route = frappe.utils.generate_route(opts);
                var currentURL = window.location.href;
                var domainWithPort = window.location.host;
                let resultArray = currentURL.split(domainWithPort);
                resulturl = resultArray[1].replace(/%20/g, " ")
                resulturl = resulturl.split("?");
                if (resulturl[0] == route) {
                    activepage = "active";
                    submenuactive = 'show active';
                }
                if (dmenu.type == 'URL') {
                    route = dmenu.url;
                }

                if (dmenu.link_to == this.get_page_to_show_active()) {
                    activepage = "active";
                } else {
                    activepage = '';
                }

                submenuitems += `<li><a class="ms-link desk-sidebar-item standard-sidebar-item ${activepage}" onclick="setactivepage('${__(item.title)}');openpage(this,event)" data-current-page="${__(item.title)}"    href="${route}">${dmenu.label}</a></li>`;
            });
            shortcuts.forEach((dmenu) => {

                if (dmenu.doc_view == "New") {
                    const opts = {
                        name: dmenu.link_to,
                        type: dmenu.type,
                        doc_view: dmenu.doc_view,
                        doctype: dmenu.doctype,
                        is_query_report: 0
                    };


                    var route = frappe.utils.generate_route(opts);
                } else {
                    const opts = {
                        name: dmenu.link_to,
                        type: dmenu.type,
                        doc_view: dmenu.doc_view,
                        doctype: dmenu.doctype,
                        is_query_report: 0
                    };


                    var route = frappe.utils.generate_route(opts);
                }



                var currentURL = window.location.href;
                var domainWithPort = window.location.host;
                let resultArray = currentURL.split(domainWithPort);
                resulturl = resultArray[1].replace(/%20/g, " ")
                resulturl = resulturl.split("?");
                if (resulturl[0] == route) {
                    activepage = "active";
                    submenuactive = 'show active';
                }
                if (dmenu.type == 'URL') {
                    route = dmenu.url;
                }
                if (dmenu.link_to == this.get_page_to_show_active()) {
                    activepage = "active";
                } else {
                    activepage = '';
                }
                submenuitems += `<li><a class="ms-link desk-sidebar-item standard-sidebar-item ${activepage}" onclick="setactivepage('${__(item.title)}');openpage(this,event)" data-current-page="${__(item.title)}"  href="${route}">${dmenu.label}</a></li>`;
            });
			let labels=item.label;
			labels = labels.replace(/\s/g, '');
            submenu = `<ul class="sub-menu collapse  ${submenuactive}" id="item${labels}">`;
            submenu += submenuitems;
            submenu += '</ul>';
            /*
            /app/${item.public
                    ? frappe.router.slug(item.title)
                    : "private/" + frappe.router.slug(item.title)
                }
            */
			labels=item.label;
			labels = labels.replace(/\s/g, '');
            return $(`
            <li class="collapsed sidebar-item">
                <a class="m-link ${activepage} sidebar-link has-arrow sidebar-link success-hover-bg" data-bs-parent="#accordionmainmenu" data-bs-toggle="collapse" data-bs-target="#item${labels}" href="#" aria-expanded="false">
                        ${frappe.utils.icon(
                item.icon || "folder-normal",
                "md"
            )}    
                        <span class="mx-2 ps-1">${__(item.title)}</span>
                  <span class="arrow fa fa-angle-down ms-auto text-end d-none hide"></span>
                </a> 
                 ${submenu} 
            </li> 
        `);
        } else {
            if (item.title == current_page) {
                activepage = 'active';
                submenuactive = 'show';
            }
            return $(`
        <li class="collapsed sidebar-item">
            <a class="m-link ${activepage} sidebar-link success-hover-bg" onclick="openpage(this,event)"  href="/app/${item.public
                    ? frappe.router.slug(item.title)
                    : "private/" + frappe.router.slug(item.title)
                }" aria-expanded="true">
                    ${frappe.utils.icon(
                    item.icon || "folder-normal",
                    "md"
                )}
                    <span class="mx-3 ps-1">${__(item.title)}</span> 
            </a> 
             ${submenu} 
        </li> 
    `);
        }

    } else {
        return $(``);
    }

}
//localStorage.setItem('current_page', page.name);
function add_sidebar_actions(item, sidebar_control, is_new) {
    if (!item.is_hidden) {

        frappe.utils.add_custom_button(
            frappe.utils.icon("drag", "xs"),
            null,
            "drag-handle",
            __("Drag"),
            null,
            sidebar_control
        );

        // !is_new && add_settings_button(item, sidebar_control);
    }
}

function add_drop_icon(item, sidebar_control, item_container) {
    let drop_icon = "small-down";
    if (item_container.find(`[item-name="${current_page.name}"]`).length) {
        drop_icon = "small-up";
    }

    let $child_item_section = item_container.find(".sidebar-child-item");
    let $drop_icon = $(
        `<span class="drop-icon hidden">${frappe.utils.icon(drop_icon, "sm")}</span>`
    ).appendTo(sidebar_control);
    let pages = item.public ? public_pages : private_pages;
    if (
        pages.some(
            (e) => e.parent_page == item.title && (e.is_hidden == 0)
        )
    ) {
        $drop_icon.removeClass("hidden");
    }
    $drop_icon.on("click", () => {
        let icon =
            $drop_icon.find("use").attr("href") === "#icon-small-down"
                ? "#icon-small-up"
                : "#icon-small-down";
        $drop_icon.find("use").attr("href", icon);
        $child_item_section.toggleClass("hidden");
    });
}

function get_data(page, ele) {
    return '';
}

function getsidebaritemsold() {

    frappe.call({
        method: "frappe.desk.desktop.get_workspace_sidebar_items",
        freeze: true,
        callback: function (r) {
            var pages = r.message.pages;
            var counter = 0;
            $('.side-navbar .main-nav').html('');

            pages.forEach((category) => {

                if (category.is_hidden == 0) {
                    var activeclass = "";
                    const opts = {
                        name: category.name,
                        type: category.link_type,
                        doctype: category.doctype,
                        is_query_report: category.is_query_report
                    };
                    const route = frappe.utils.generate_route(opts);

                    if (frappe.router.current_sub_path == frappe.router.slug(category.name)) {
                        activeclass = "active";
                    }
                    $('.side-navbar .main-nav').append(`<li  class="collapsed">
                    <a class="m-link active sidebar-link sidebar-link success-hover-bg" data-bs-toggle="collapse" data-bs-target="#menu_dash"  onclick="openpage(this,event)" href="${route}" aria-expanded="true"><span class="sidebar-item-icon" item-icon=${category.icon || "folder-normal"}>${frappe.utils.icon(
                        category.icon || "folder-normal",
                        "md"
                    )
                        }</span ><span class="mx-3 ps-1">${category.name}</span><span class="arrow fa fa-angle-down ms-auto text-end d-none hide"></span></a>
                    </li > `);
                    // get_desktop_page(category);
                    counter++;

                }

            });

            // setTimeout(function () {
            //     var actviemenu = $('.flex-grow-1 .tab-content .tab-pane ul li.activemenu').data('parent');

            //     if (actviemenu == null || actviemenu == undefined || actviemenu == 'undefined') {
            //         var actviemenu = $('.flex-grow-1 .tab-content .tab-pane .mainitem.activemenu').data('parent');
            //     }

            //     if (actviemenu == null || actviemenu == undefined || actviemenu == 'undefined') {
            //         $('.side-navbar .flex-grow-1 .tab-content .tab-pane').first().addClass('show');
            //         $('.side-navbar .flex-grow-1 .tab-content .tab-pane').first().addClass('active');
            //         $('.side-navbar .flex-grow-1 .tab-content .tab-pane.active .mainitem').addClass('activemenu');
            //         var actviemenu = $('.flex-grow-1 .tab-content .tab-pane .mainitem.activemenu').data('parent');
            //     }
            //     $('.flex-shrink-0 #' + actviemenu).addClass('active');
            // }, 2000)


        }
    });
}
function setactivepage(page) {
    localStorage.setItem('current_page', page);
}
$(function () {
	
	
    $(".menu-toggle").on("click", function () {
        $("body").toggleClass("sidebar-mini")
    });

    

    if ($('#userfullnamesession').length > 0) {
        $('#userfullnamesession').html(frappe.session.user_fullname);
    }
    if ($('#usertypesession').length > 0) {
        $('#usertypesession').html(frappe.session.user);
    }
    if ($('#userimageavatar').length > 0) {
        $('#userimageavatar').html(frappe.avatar(frappe.session.user, "avatar-large"));
    }
	
	$('.brand-logo img').attr('src',frappe.boot.app_logo_url );
	if(frappe.boot.my_company){
		$('.brand-logo #companynamebrand').html(frappe.boot.my_company);
		$('.logo-img').css('width', '60px');
	}else{
		$('.brand-logo #companynamebrand').html(frappe.sys_defaults.company);
		$('.logo-img').css('width', '30px');
	}
	
	
	getsidebaritems();
})

function openpage(element, event) {
    var href = $(element).attr('href');
    frappe.set_route(href);
    event.preventDefault();
    $('.standard-sidebar-item').removeClass('active');
    $(element).addClass('active');
    setactivepage()
}

