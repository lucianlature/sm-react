/**
 * Created by Lucian on 14/09/2016.
 */

'use strict';

import $ from 'jquery';
import React from 'react';
import I from 'react-fontawesome';
import NavLink from '../NavLink';

class SidebarLeft extends React.Component {
  componentDidMount () {
    function _fix () {
      // Get window height and the wrapper height
      const neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
      const window_height = $(window).height();
      const sidebar_height = $('.sidebar').height();
      //Set the min-height of the content and sidebar based on the
      //the height of the document.
      if ($('body').hasClass('fixed')) {
        $('.content-wrapper, .right-side').css('min-height', window_height - $('.main-footer').outerHeight());
      } else {
        let postSetWidth;
        if (window_height >= sidebar_height) {
          $('.content-wrapper, .right-side').css('min-height', window_height - neg);
          postSetWidth = window_height - neg;
        } else {
          $('.content-wrapper, .right-side').css('min-height', sidebar_height);
          postSetWidth = sidebar_height;
        }

        //Fix for the control sidebar height
        const controlSidebar = $('.control-sidebar');
        if (typeof controlSidebar !== 'undefined') {
          if (controlSidebar.height() > postSetWidth)
            $('.content-wrapper, .right-side').css('min-height', controlSidebar.height());
        }

      }
    }

    const animationSpeed = 500;
    $('.sidebar li a').on('click', function (e) {
      //Get the clicked link and the next element
      const $this = $(this);
      const checkElement = $this.next();

      //Check if the next element is a menu and is visible
      if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
        //Close the menu
        checkElement.slideUp(animationSpeed, function () {
          checkElement.removeClass('menu-open');
        });
        checkElement.parent('li').removeClass('active');
      }
      //If the menu is not visible
      else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
        //Get the parent menu
        const parent = $this.parents('ul').first();
        //Close all open menus within the parent
        const ul = parent.find('ul:visible').slideUp(animationSpeed);
        //Remove the menu-open class from the parent
        ul.removeClass('menu-open');
        //Get the parent li
        const parent_li = $this.parent('li');

        //Open the target menu and add the menu-open class
        checkElement.slideDown(animationSpeed, function () {
          //Add the class active to the parent li
          checkElement.addClass('menu-open');
          parent.find('li.active').removeClass('active');
          parent_li.addClass('active');
          //Fix the layout in case the sidebar stretches over the height of the window
          _fix();
        });
      }
      //if this isn't a link, prevent the page from being redirected
      if (checkElement.is('.treeview-menu')) {
        e.preventDefault();
      }
    });

    //Get the screen sizes
    var screenSizes = {
      xs: 480,
      sm: 768,
      md: 992,
      lg: 1200
    };
    var toggleBtn = '.sidebar-toggle';
    //Enable sidebar toggle
    $(toggleBtn).on('click', function (e) {
      e.preventDefault();
      //Enable sidebar push menu
      if ($(window).width() > (screenSizes.sm - 1)) {
        if ($('body').hasClass('sidebar-collapse')) {
          $('body').removeClass('sidebar-collapse').trigger('expanded.pushMenu');
        } else {
          $('body').addClass('sidebar-collapse').trigger('collapsed.pushMenu');
        }
      }
      //Handle sidebar push menu for small screens
      else {
        if ($('body').hasClass('sidebar-open')) {
          $('body').removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
        } else {
          $('body').addClass('sidebar-open').trigger('expanded.pushMenu');
        }
      }
    });

    $('.content-wrapper').click(function () {
      //Enable hide menu when clicking on the content-wrapper on small screens
      if ($(window).width() <= (screenSizes.sm - 1) && $('body').hasClass('sidebar-open')) {
        $('body').removeClass('sidebar-open');
      }
    });

    //Enable expand on hover for sidebar mini
    if (false
      || ($('body').hasClass('fixed')
      && $('body').hasClass('sidebar-mini'))) {
      expandOnHover();
    }

    function expandOnHover() {
      var screenWidth = screenSizes.sm - 1;
      //Expand sidebar on hover
      $('.main-sidebar').hover(function () {
        if ($('body').hasClass('sidebar-mini')
          && $('body').hasClass('sidebar-collapse')
          && $(window).width() > screenWidth) {
          expand();
        }
      }, function () {
        if ($('body').hasClass('sidebar-mini')
          && $('body').hasClass('sidebar-expanded-on-hover')
          && $(window).width() > screenWidth) {
          collapse();
        }
      });
    }

    function expand() {
      $('body').removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
    }

    function collapse () {
      if ($('body').hasClass('sidebar-expanded-on-hover')) {
        $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
      }
    }
  }
  render() {
    return (
      <aside className="main-sidebar">
        {/* sidebar: style can be found in sidebar.scss */}
        <section className="sidebar">
          {/* SidebarLeft user panel */}
          <div className="user-panel">
            <div className="pull-left image">
              <img src="/img/user3-128x128.jpg" className="img-circle" alt="User Image" />
            </div>
            <div className="pull-left info">
              <p>Lucian Lature</p>
              <a href="#"><I name="circle text-success" /> Online</a>
            </div>
          </div>
          {/* sidebar menu: : style can be found in sidebar.less */}
          <ul className="sidebar-menu">
            <li>
              <NavLink to="/collections">
                <I name="dashboard" /> <span>Collections</span>
              </NavLink>
            </li>
          </ul>
        </section>
        {/* /.sidebar */}
      </aside>
    );
  }
}

SidebarLeft.displayName = 'SidebarLeft';

export default SidebarLeft;
