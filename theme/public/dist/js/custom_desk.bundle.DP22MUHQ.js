(()=>{frappe.templates.navbar=`<header class="page-header topbar sticky-top" role="navigation">
    <div class="with-vertical">
        <nav class="navbar navbar-expand-lg p-0">
            <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link sidebartoggler nav-icon-hover" id="headerCollapse" onclick="sidebartoggler()" href="javascript:void(0)">
                    <div class="nav-icon-hover-bg rounded-circle ">
                      <iconify-icon icon="solar:list-bold-duotone" class="fs-7 text-dark"></iconify-icon>
                    </div>
                  </a>
                </li>
            </ul>
            <ul class="nav navbar-nav d-none navbar-nav quick-links d-none d-lg-flex" id="navbar-breadcrumbs"></ul>
            
        <div class="d-flex justify-content-between align-items-center navbar-collapse justify-content-end">
            <a class="me-4 d-lg-inline-flex d-none menu-toggle hide" href="#" title="Sidebar Toggle">
                <!-- <svg width="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill="var(--accent-color)"
                        d="M14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L12.4142 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H12.4142L14.7071 15.2929C15.0976 15.6834 15.0976 16.3166 14.7071 16.7071C14.3166 17.0976 13.6834 17.0976 13.2929 16.7071L9.29289 12.7071C8.90237 12.3166 8.90237 11.6834 9.29289 11.2929L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289Z" />
                    <path fill="var(--accent-color)" fill-opacity="0.3"
                        d="M4 3C4.55228 3 5 3.44772 5 4V20C5 20.5523 4.55228 21 4 21C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3Z" />
                </svg> -->
            </a> 
            <ul class="header-menu flex-grow-1"> 
                <li class="d-none">
                    <!-- <ul class="nav navbar-nav d-none d-sm-flex" id="navbar-breadcrumbs"></ul> -->
                </li>
                <li>
                    <div class="">
                        <form class="form-inline nav-form nav-link position-relative shadow-none" role="search" onsubmit="return false;">
                            {% if (frappe.boot.read_only) { %}
                            <span class="indicator-pill yellow no-indicator-dot" title="{%= __(" Your site is getting
                                upgraded.") %}">
                                {%= __("Read Only Mode") %}
                            </span>
                            {% } %}
                            <div class="input-group search-bar hidden">
								 
                                <input id="navbar-search" type="text" class="form-control rounded-3 py-2 ps-5 text-dark" placeholder="{%= __(" Search or type a command (Ctrl + G)") %}" aria-haspopup="true" aria-describedby="basic-addon1" />
                                    <iconify-icon icon="solar:magnifer-linear" class="text-dark position-absolute top-50 start-0 translate-middle-y text-dark ms-3"></iconify-icon>
                            </div>
                        </form>
                    </div>
                </li>  
				<li class="nav-item dropdown dropdown-notifications dropdown-mobile notification_">
                    <a class="nav-link notifications-icon text-muted" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="true" href="#" onclick="return false;">
                        <span class="notifications-seen">
                            <svg width="20" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <circle opacity="0.3" cx="11" cy="11" r="4" />
                                <path
                                    d="M9 18C9.59674 18 10.169 17.7629 10.591 17.341C11.0129 16.919 11.25 16.3467 11.25 15.75H6.75C6.75 16.3467 6.98705 16.919 7.40901 17.341C7.83097 17.7629 8.40326 18 9 18ZM9 2.15775L8.10337 2.33888C7.08633 2.5461 6.17212 3.09837 5.51548 3.9022C4.85884 4.70603 4.50011 5.71206 4.5 6.75C4.5 7.4565 4.34925 9.22162 3.98362 10.9597C3.80362 11.8226 3.56063 12.7215 3.23775 13.5H14.7622C14.4394 12.7215 14.1975 11.8237 14.0164 10.9597C13.6507 9.22162 13.5 7.4565 13.5 6.75C13.4996 5.71225 13.1408 4.70649 12.4842 3.90289C11.8275 3.09929 10.9135 2.54719 9.89662 2.34L9 2.15663V2.15775ZM15.9975 13.5C16.2484 14.0029 16.5386 14.4011 16.875 14.625H1.125C1.46137 14.4011 1.75162 14.0029 2.0025 13.5C3.015 11.475 3.375 7.74 3.375 6.75C3.375 4.0275 5.31 1.755 7.88063 1.23637C7.86492 1.07995 7.88218 0.921967 7.93129 0.77262C7.98039 0.623273 8.06026 0.485876 8.16573 0.36929C8.27119 0.252705 8.39993 0.159519 8.54362 0.0957427C8.68732 0.0319665 8.84279 -0.000984192 9 -0.000984192C9.15721 -0.000984192 9.31268 0.0319665 9.45638 0.0957427C9.60007 0.159519 9.72881 0.252705 9.83428 0.36929C9.93974 0.485876 10.0196 0.623273 10.0687 0.77262C10.1178 0.921967 10.1351 1.07995 10.1194 1.23637C11.3909 1.49501 12.534 2.18516 13.3551 3.18994C14.1762 4.19472 14.6248 5.4524 14.625 6.75C14.625 7.74 14.985 11.475 15.9975 13.5Z" />
                            </svg>
                        </span>
                        <span class="notifications-unseen">
                            <svg class="icon icon-md">
                                <use href="#icon-notification-with-indicator"></use>
                            </svg>
                        </span>
                    </a>
                    <div class="dropdown-menu notifications-list dropdown-menu-right notifications_popup" role="menu">
                        <div class="notification-list-header d-flex justify-content-between align-items-center notification_header">
                            <div class="header-items"></div>
                            <div class="header-actions"></div>
                        </div>
                        <div class="notification-list-body content">
                            <div class="panel-notifications"></div>
                            <div class="panel-events"></div>
                        </div>
                       <!--  <div class="d-flex justify-content-between align-items-center notification_header">
                            <p >Notifications</p>
                            <p class="counter">5 new</p>
                        </div> -->
                        <!-- <div class="content">
                            <div class="d-flex gap-2 align-items-center inner_content">
                                <div class="profile_img">
                                    <img src="/assets/theme/img/user-4.jpg" alt="">
                                </div>
                                <div>
                                    <p class="m-0 title">Roman Joined the Team!</p>
                                    <p class="m-0">Congratulate him</p>
                                </div>
                            </div>
                            <div class="d-flex mt-2 gap-2 align-items-center inner_content">
                                <div class="profile_img">
                                    <img src="/assets/theme/img/user-4.jpg" alt="">
                                </div>
                                <div>
                                    <p class="m-0 title">Roman Joined the Team!</p>
                                    <p class="m-0">Congratulate him</p>
                                </div>
                            </div>
                            <div class="d-flex mt-2 gap-2 align-items-center inner_content">
                                <div class="profile_img">
                                    <img src="/assets/theme/img/user-4.jpg" alt="">
                                </div>
                                <div>
                                    <p class="m-0 title">Roman Joined the Team!</p>
                                    <p class="m-0">Congratulate him</p>
                                </div>
                            </div>
                            <div class="d-flex mt-2 gap-2 align-items-center inner_content">
                                <div class="profile_img">
                                    <img src="/assets/theme/img/user-4.jpg" alt="">
                                </div>
                                <div>
                                    <p class="m-0 title">Roman Joined the Team!</p>
                                    <p class="m-0">Congratulate him</p>
                                </div>
                            </div>
                            <div class="d-flex mt-2 gap-2 align-items-center inner_content">
                                <div class="profile_img">
                                    <img src="/assets/theme/img/user-4.jpg" alt="">
                                </div>
                                <div>
                                    <p class="m-0 title">Roman Joined the Team!</p>
                                    <p class="m-0">Congratulate him</p>
                                </div>
                            </div>
                        </div> -->
                        <div class="mt-2 text-center"> 
                            <a class="btn bg-primary py-1 text-white">see all notification</a>
                        </div>
                    </div>
                </li> 
                <li class="dropdown user">
                    <a class="nav-link position-relative ms-6 dropdown-toggle text-decoration-none" href="javascript:void(0)"  data-bs-toggle="dropdown"
                    aria-expanded="false" title="User">
                        <div class="d-flex align-items-center flex-shrink-0">
                          <div class="user-profile me-sm-3 me-2">
                            {{ avatar }}
                          </div>
                          <span class="d-sm-none d-block">
                            <iconify-icon icon="solar:alt-arrow-down-line-duotone"></iconify-icon>
                          </span>
                          <div class="d-none d-sm-block">
                            <h6 class="fw-bold fs-4 mb-1 profile-name"> {{frappe.session.user_fullname}} </h6>
                            <p class="fs-3 lh-base mb-0 profile-subtext"> {{frappe.session.user}} </p>
                          </div>
                        </div>
                    </a> 
                    <div class="dropdown-menu dropdown-menu-end shadow border-0 p-4 rounded-4 content-dd dropdown-menu-end dropdown-menu-animate-up"> 
                        <div class="profile-dropdown position-relative">
                            <ul class="dropdown_list">
                                <!-- <li class="mb-3"> 
                                    <a class="h5" href="#" title="">
                                        <span>{{ avatar }}</span>  <span>{{frappe.session.user_fullname}}</span>
                                    </a>
                                    <p>{{frappe.session.role}}</p>
                                    <p>{{frappe.session.user_email}}</p>
                                    
                                </li> -->
                                <li class="d-flex gap-2 align-items-center">
                                    <div>
                                        {{ avatar }}
                                    </div>
                                    <div>
                                        <p class="m-0 title">{{frappe.session.user_fullname}}</p>
                                        <p class="m-0">{{frappe.session.role}}</p>
                                        <p class="m-0 align-items-center d-flex"><i class="fa-regular fa-envelope me-1"></i>{{frappe.session.user_email}}</p>
                                    </div>
                                </li>
                                <li class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="/app/user/{{frappe.session.user}}"><span class="profile"><i class="fa-regular fa-user"></i></span>My Profile</a></li>
                                <li><a class="dropdown-item" href="/update-password"><span class="password"><i class="fa-solid fa-key"></i></span>Update Password</a></li>
                                <li> <a class="dropdown-item" onclick="return frappe.ui.toolbar.clear_cache()"><span class="reload"><i class="fa-solid fa-rotate-right"></i></span> Reload</a></li>
                             
                                <li><a class="btn bg-primary py-1 text-white w-100" href="login"
                                    onclick="return frappe.app.logout()" role="button">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                   
                </li>	
            </ul>
        </div>
        </nav>
    </div>
</header>`;frappe.templates.page=`<div class="page-head flex">
    <div class="container">
        <div class="row flex align-center page-head-content justify-between">
            <div class="col-md-4 col-sm-6 col-xs-8 page-title">
                <!-- <div class="title-image hide hidden-md hidden-lg"></div> -->
                <!-- title -->
                <span class="sidebar-toggle-btn">
                    <svg class="icon icon-md sidebar-toggle-placeholder">
                        <use href="#icon-menu"></use>
                    </svg>
                    <span class="sidebar-toggle-icon">
                        <svg class="icon icon-md">
                            <use href="#icon-sidebar-collapse">
                            </use>
                        </svg>
                    </span>
                </span>
                <div class="flex fill-width title-area">
                    <div>
                        <div class="flex">
                            <h3 class="ellipsis title-text"></h3>
                            <span class="indicator-pill whitespace-nowrap"></span>
                        </div>
                        <div class="ellipsis sub-heading hide text-muted"></div>
                    </div>
                    <button class="btn btn-default more-button hide">
                        <svg class="icon icon-sm">
                            <use href="#icon-dot-horizontal">
                            </use>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="flex col page-actions justify-content-end">
                <!-- buttons -->
                <div class="custom-actions hide hidden-xs hidden-md"></div>
                <div class="standard-actions flex">
                    <span class="page-icon-group hide hidden-xs hidden-sm"></span>
                    <div class="menu-btn-group hide">
                        <button type="button" class="btn btn-default icon-btn" data-toggle="dropdown"
                            aria-expanded="false">
                            <span>
                                <span class="menu-btn-group-label">
                                    <svg class="icon icon-sm">
                                        <use href="#icon-dot-horizontal">
                                        </use>
                                    </svg>
                                </span>
                            </span>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-right" role="menu"></ul>
                    </div>
                    <button class="btn btn-secondary btn-default btn-sm hide"></button>
                    <div class="actions-btn-group hide">
                        <button type="button" class="btn btn-primary btn-sm" data-toggle="dropdown"
                            aria-expanded="false">
                            <span>
                                <span class="hidden-xs actions-btn-group-label">{%= __("Actions") %}</span>
                                <svg class="icon icon-xs">
                                    <use href="#icon-select">
                                    </use>
                                </svg>
                            </span>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-right" role="menu">
                        </ul>
                    </div>
                    <button class="btn btn-primary btn-sm hide primary-action"></button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="container page-body">
    <div class="page-toolbar hide">
        <div class="container">
		
        </div>
    </div>
    <div class="page-wrapper">
        <div class="page-content">
            <div class="workflow-button-area btn-group pull-right hide"></div>
            <div class="clearfix"></div>
        </div>
    </div>
</div>`;})();
//# sourceMappingURL=custom_desk.bundle.DP22MUHQ.js.map
