const currentScript = document.currentScript;

function get_user_data() {
    const user_name = currentScript.getAttribute('data-user-name') || '';
    const user_email = currentScript.getAttribute('data-user-email') || '';
    const user_role = currentScript.getAttribute('data-user-role') || '';
    const user_type = currentScript.getAttribute('data-user-type') || '';
    window.user_name = user_name;
    window.user_email = user_email;
    window.user_role = user_role;
    window.user_type = user_type;
    return { user_name, user_email, user_role, user_type };
  }
get_user_data();
const attr_app = 'data-app';
const attr_ark = 'data-ark';
const attr_help_title = 'data-help-title';

let data_app = 'hl';
if (currentScript.hasAttribute(attr_app)) data_app = currentScript.getAttribute(attr_app);
window.data_app = data_app;
if (window.data_app == 'hl' && !document.body.classList.contains('hlwidget')) document.body.classList.add('hlwidget');
if (window.data_app == 'gen' && !document.body.classList.contains('genwidget')) document.body.classList.add('genwidget');

let data_ark = '';
if (currentScript.hasAttribute(attr_ark)) data_ark = currentScript.getAttribute(attr_ark);
window.data_ark = data_ark;

let data_help_title = 'Help Library';
if (currentScript.hasAttribute(attr_help_title)) data_help_title = currentScript.getAttribute(attr_help_title);
window.data_help_title = data_help_title;

window.is_dragging = false;
window.is_rePositioned = false;

window.is_agency_widget_enabled = 1;
window.is_agency_lc_enabled = 1;
window.is_agency_email_enabled = 1;
window.is_location_customlogo_enabled = false;
window.is_agency_guided_tour_enabled = false;
window.is_attribs_guided_tour_enabled = false;
window.compact_widget = false;
window.expendedState_compact = false;
window.is_agency_priority_enabled = 0;
window.is_user_name = '';
window.is_user_email = '';

//Admin Cls
if (window.data_app == 'hl') {
  class hlpt_agency_user_style {
    i() {
      const hlpt_cc_page_loaded = (usbd) => {
        if (document.readyState != 'loading') {
          usbd();
        } else {
          document.addEventListener('DOMContentLoaded', usbd);
        }
      };
      const hlpt_check_page_change = () => {
        const targetNode = document.querySelector('#app');
        const config = { attributes: true };
        const observer = new MutationObserver(function (mutations) {
          hlpt_add_agency_css_class();
          hlpt_verify_switch_agency();
          hlpt_agency_admin_db();
        });
        observer.observe(targetNode, config);
      };
      const hlpt_add_agency_css_class = () => {
        var header_a = document.querySelectorAll('.hl_header--controls a');
        var i;
        var header_a_href = '';
        var agency_link_found = 0;
        for (i = 0; i < header_a.length; i++) {
          header_a_href = header_a[i].getAttribute('href');
          if (header_a_href == '/accounts/') {
            agency_link_found = 1;
            break;
          }
        }
        if (agency_link_found) {
          hlpt_specify_aa();
        }
      };
      const hlpt_verify_switch_agency = () => {
        var header_a = document.querySelector('.hl_header--controls');
        if (document.body.contains(header_a)) {
          var pu = document.location.href;
          if (pu.includes('/location')) {
            var agency_switcher = document.querySelector('#switcher-agency-switch');
            if (document.body.contains(agency_switcher)) {
              hlpt_specify_aa();
            }
          } else {
            hlpt_specify_aa();
          }
        } else {
          setTimeout(hlpt_verify_switch_agency, 250);
        }
      };
      const hlpt_verify_user_type = () => {
        if (window.user_type == 'agency') {
          hlpt_specify_aa();
        }
      };
      const hlpt_agency_admin_db = () => {
        var page_header = document.querySelector('.hl_header');
        if (document.body.contains(page_header) && page_header.classList.contains('--agency')) {
          hlpt_specify_aa();
        }
      };
      const hlpt_specify_aa = () => {
        document.body.classList.add('IsAdmin');
      };
      hlpt_cc_page_loaded(() => {
        hlpt_add_agency_css_class();
        hlpt_agency_admin_db();
        hlpt_check_page_change();
        hlpt_verify_user_type();
      });
    }
  }
  new hlpt_agency_user_style().i();
}
////////////////////////////////////////

if (window.data_app == 'hl') {
  class hlpt_location_user_style {
    i() {
      const hlpt_cc_page_loaded = (usbd) => {
        if (document.readyState != 'loading') {
          usbd();
        } else {
          document.addEventListener('DOMContentLoaded', usbd);
        }
      };
      const hlpt_check_page_change = () => {
        const targetNode = document.querySelector('#app');
        const config = { attributes: true };
        const observer = new MutationObserver(function (mutations) {
          hlpt_remove_location_css_class();
          hlpt_verify_switch_agency();
          hlpt_agency_admin_db();
        });
        observer.observe(targetNode, config);
      };

      const add_location_user_class = () => {
        hlpt_specify_lu();
      };

      const hlpt_remove_location_css_class = () => {
        var header_a = document.querySelectorAll('.hl_header--controls a');
        var i;
        var header_a_href = '';
        var agency_link_found = 0;
        for (i = 0; i < header_a.length; i++) {
          header_a_href = header_a[i].getAttribute('href');
          if (header_a_href == '/accounts/') {
            agency_link_found = 1;
            break;
          }
        }
        if (agency_link_found) {
          hlpt_specify_aa();
        }
      };
      const hlpt_verify_switch_agency = () => {
        var header_a = document.querySelector('.hl_header--controls');
        if (document.body.contains(header_a)) {
          var pu = document.location.href;
          if (pu.includes('/location')) {
            var agency_switcher = document.querySelector('#switcher-agency-switch');
            if (document.body.contains(agency_switcher)) {
              hlpt_specify_aa();
            }
          } else {
            hlpt_specify_aa();
          }
        } else {
          setTimeout(hlpt_verify_switch_agency, 250);
        }
      };

      const hlpt_agency_admin_db = () => {
        var page_header = document.querySelector('.hl_header');
        if (document.body.contains(page_header) && page_header.classList.contains('--agency')) {
          hlpt_specify_aa();
        }
      };
      const hlpt_verify_user_type = () => {
        if (window.user_type == 'agency') {
          hlpt_specify_aa();
        }
      };
      const hlpt_specify_aa = () => {
        document.body.classList.remove('IsUser');
      };
      const hlpt_specify_lu = () => {
        document.body.classList.add('IsUser');
      };
      hlpt_cc_page_loaded(() => {
        add_location_user_class();
        hlpt_verify_user_type();
        hlpt_remove_location_css_class();
        hlpt_agency_admin_db();
        hlpt_check_page_change();

      });
    }
  }
  new hlpt_location_user_style().i();
}

////////////////////////////////////////
if (window.data_app == 'hl') {
  (function () {
    const lid = function () {
      var tlid = '';
      var purl = document.location.href;
      var pua = purl.split('/');
      var location_pos = pua.indexOf('location');
      if (location_pos) {
        var tlid_pos = location_pos + 1;
        tlid = pua[tlid_pos];
      }
      return tlid;
    };
    const slcls = () => {
      var clid = lid();
      var cls_init = 'hlpt_loc_';
      location_plan_class = cls_init + clid;
      var ebc = document.body.className.toString().split(/\s+/);
      for (var j = 0; j < ebc.length; j++) {
        var cls = ebc[j];
        if (cls && cls != location_plan_class && cls.startsWith(cls_init)) {
          document.body.classList.remove(cls);
        }
      }
      document.body.classList.add(location_plan_class);
    };
    const mo = () => {
      const targetNode = document.querySelector('#app');
      const config = { attributes: true };
      const observer = new MutationObserver(function (mutations) {
        slcls();
      });
      observer.observe(targetNode, config);
    };
    mo();
  })();
}
////////////////////////////////////////

(function () {
  ////////////////////////////////////////
  const themegen_url = 'https://cdn2.locationapi.co/themegenerator/dashboard-customizer_v1.0.js?v=' + Date.now();
  const hlpt_load_themegen = function (ref_key) {
    var load_themegen = 'true';
    if (currentScript.hasAttribute('data-themegen')) {
      load_themegen = currentScript.getAttribute('data-themegen');
    }
    var existing_themegen = document.querySelector('#hlpt-dashboard-customizer');
    if (load_themegen == 'true' && !document.head.contains(existing_themegen)) {
      var script = document.createElement('script');
      script.setAttribute('id', 'hlpt-dashboard-customizer');
      script.type = 'text/javascript';
      script.src = themegen_url;
      script.setAttribute('data-ark', ref_key);
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  };
  //////////////////////////

  ////////////////////////////////////////
  const controlpanel_url = 'https://cdn.hlprotools.com/resources/widgets/1/cp.js?v=' + Date.now();
  const hlpt_load_controlpanel = function (ref_key) {
    var load_controlpanel = 'true';
    if (currentScript.hasAttribute('data-cp')) {
      load_controlpanel = currentScript.getAttribute('data-cp');
    }
    var existing_controlpanel = document.querySelector('#hlpt-cp');
    if (load_controlpanel == 'true' && !document.head.contains(existing_controlpanel)) {
      var script = document.createElement('script');
      script.setAttribute('id', 'hlpt-cp');
      script.type = 'text/javascript';
      script.src = controlpanel_url;
      script.setAttribute('data-ark', ref_key);
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  };
  //////////////////////////

  ////////////////////////////////////////
  const controlpanel_lp_url = 'https://cdn.hlprotools.com/resources/widgets/1/lp.js?v=' + Date.now();
  const hlpt_load_controlpanel_lp = function (ref_key) {
    var load_controlpanel_lp = 'true';
    if (currentScript.hasAttribute('data-lp')) {
      load_controlpanel_lp = currentScript.getAttribute('data-lp');
    }
    var existing_controlpanel_lp = document.querySelector('#hlpt-lp');
    if (load_controlpanel_lp == 'true' && !document.head.contains(existing_controlpanel_lp)) {
      var script = document.createElement('script');
      script.setAttribute('id', 'hlpt-lp');
      script.type = 'text/javascript';
      script.src = controlpanel_lp_url;
      script.setAttribute('data-ark', ref_key);
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  };
  //////////////////////////

  const smart_custom_buttons = 'https://cdn.hlprotools.com/resources/widgets/1/scb.js?v=' + Date.now();
  const hlpt_load_smart_custom_buttons = function (ref_key) {
    var load_smart_custom_buttons = 'true';
    if (currentScript.hasAttribute('data-scb')) {
      load_smart_custom_buttons = currentScript.getAttribute('data-scb');
    }
    var existing_smart_custom_buttons = document.querySelector('#hlpt-scb');
    if (load_smart_custom_buttons == 'true' && !document.head.contains(existing_smart_custom_buttons)) {
      var script = document.createElement('script');
      script.setAttribute('id', 'hlpt-scb');
      script.type = 'text/javascript';
      script.src = smart_custom_buttons;
      script.setAttribute('data-ark', ref_key);
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  };
  const apm_url = 'https://cdn2.locationapi.co/cp/apm/apm.js?v=' + Date.now(); /// live 
  // const apm_url = 'https://cdn.locationapi.co/test/controlpanel/apm.js?v=' + Date.now(); /// dev
  const hlpt_load_apm = function (ref_key) {
    var load_apm = 'true';
    if (currentScript.hasAttribute('data-apm')) {
      load_apm = currentScript.getAttribute('data-apm');
    }
    var existing_apm = document.querySelector('#hlpt-apm');
    if (load_apm == 'true' && !document.head.contains(existing_apm)) {
      var script = document.createElement('script');
      script.setAttribute('id', 'hlpt-apm');
      script.type = 'text/javascript';
      script.src = apm_url;
      script.setAttribute('data-ark', ref_key);
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  };
    
  ////////////////////////////////////////
  const clientportal_themebuilder = 'https://cdn2.locationapi.co/clientportal/cptb.js?v=' + Date.now();
  const hlpt_load_cptb = function (ref_key) {
    var load_cptb = 'true';
    if (currentScript.hasAttribute('data-cptb')) {
      load_cptb = currentScript.getAttribute('data-cptb');
    }
    var existing_cptb = document.querySelector('#hlpt-cptb');
    if (load_cptb == 'true' && !document.head.contains(existing_cptb)) {
      var script = document.createElement('script');
      script.setAttribute('id', 'hlpt-cptb');
      script.type = 'text/javascript';
      script.src = clientportal_themebuilder;
      script.setAttribute('data-ark', ref_key);
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  };
  //////////////////////////

  ////////////////////////////////////////
  // guided tour new
  // const guidedtour_url = 'https://cdn.locationapi.co/test/controlpanel/gt/gt.js?v=' + Date.now();
  // const hlpt_load_guidedtour = function (ref_key) {
  //   var load_guidedtour = 'true';
  //   if (currentScript.hasAttribute('data-gt')) {
  //     load_guidedtour = currentScript.getAttribute('data-gt');
  //   }
  //   var existing_guidedtour = document.querySelector('#hlpt-gt');
  //   if (load_guidedtour == 'true' && !document.head.contains(existing_guidedtour)) {
  //     var script = document.createElement('script');
  //     script.setAttribute('id', 'hlpt-gt');
  //     script.type = 'text/javascript';
  //     script.src = guidedtour_url;
  //     script.setAttribute('data-ark', ref_key);
  //     document.getElementsByTagName('head')[0].appendChild(script);
  //   }
  // };
  //////////////////////////

  ////////////////////////////////////////
  var ufkey = 'ct_wcv7bljun5ahbgbnqm5f76dnva';
  if (currentScript.hasAttribute('data-ufkey')) {
    ufkey = currentScript.getAttribute('data-ufkey');
  }
  const hlpt_userflow = function (ufkey, agsettings) {
    if (typeof agsettings === 'object') {
      if (agsettings.hasOwnProperty('as')) {
        var agsettings_as = agsettings.as;
        if (typeof agsettings_as === 'object') {
          if (agsettings_as.hasOwnProperty('agt')) {
            window.is_agency_guided_tour_enabled = agsettings_as.agt;
          }
        }
      }
    }
    if (ufkey && (currentScript.hasAttribute('data-userflow') || window.is_agency_guided_tour_enabled)) {
      display_userflow = currentScript.getAttribute('data-userflow');
      if (display_userflow == 'true' || window.is_agency_guided_tour_enabled) {
        var user_id = '';
        if (currentScript.hasAttribute('data-user-id')) {
          user_id = currentScript.getAttribute('data-user-id');
        }
        var user_name = '';
        if (currentScript.hasAttribute('data-user-name')) {
          user_name = currentScript.getAttribute('data-user-name');
        }
        var user_email = '';
        if (currentScript.hasAttribute('data-user-email')) {
          user_email = currentScript.getAttribute('data-user-email');
        }
        var user_date_added = '';
        if (currentScript.hasAttribute('data-date-added')) {
          user_date_added = currentScript.getAttribute('data-date-added');
        }

        !(function () {
          var e,
            r = 'undefined' == typeof window ? {} : window,
            t = r.userflow;
          if (!t) {
            var n = 'https://js.userflow.com/';
            t = r.userflow = { _stubbed: !0 };
            var o = (r.USERFLOWJS_QUEUE = r.USERFLOWJS_QUEUE || []),
              s = function (e) {
                t[e] = function () {
                  var r = Array.prototype.slice.call(arguments);
                  u(), o.push([e, null, r]);
                };
              },
              i = function (e) {
                t[e] = function () {
                  var r,
                    t = Array.prototype.slice.call(arguments);
                  u();
                  var n = new Promise(function (e, t) {
                    r = { resolve: e, reject: t };
                  });
                  return o.push([e, r, t]), n;
                };
              },
              a = !1,
              u = function () {
                if (!a) {
                  a = !0;
                  var e = document.createElement('script');
                  e.async = !0;
                  var t = r.USERFLOWJS_ENV_VARS || {};
                  'es2020' ===
                  (t.USERFLOWJS_BROWSER_TARGET ||
                    (function (e) {
                      for (
                        var r = [
                            [/Edg\//, /Edg\/(\d+)/, 80],
                            [/OPR\//, /OPR\/(\d+)/, 67],
                            [/Chrome\//, /Chrome\/(\d+)/, 80],
                            [/Safari\//, /Version\/(\d+)/, 14],
                            [/Firefox\//, /Firefox\/(\d+)/, 74],
                          ],
                          t = 0;
                        t < r.length;
                        t++
                      ) {
                        var n = r[t],
                          o = n[0],
                          s = n[1],
                          i = n[2];
                        if (e.match(o)) {
                          var a = e.match(new RegExp(s));
                          if (a && parseInt(a[1], 10) >= i) return 'es2020';
                          break;
                        }
                      }
                      return 'legacy';
                    })(navigator.userAgent))
                    ? ((e.type = 'module'), (e.src = t.USERFLOWJS_ES2020_URL || n + 'es2020/userflow.js'))
                    : (e.src = t.USERFLOWJS_LEGACY_URL || n + 'legacy/userflow.js'),
                    (e.onerror = function () {
                      (a = !1), console.error('Could not load Userflow.js');
                    }),
                    document.head.appendChild(e);
                }
              };
            s('_setTargetEnv'),
              s('init'),
              s('off'),
              s('on'),
              s('prepareAudio'),
              s('registerCustomInput'),
              s('remount'),
              s('reset'),
              s('setCustomInputSelector'),
              s('setCustomNavigate'),
              s('setCustomScrollIntoView'),
              s('setInferenceAttributeFilter'),
              s('setInferenceAttributeNames'),
              s('setInferenceClassNameFilter'),
              s('setScrollPadding'),
              s('setShadowDomEnabled'),
              s('setUrlFilter'),
              i('endAll'),
              i('endAllFlows'),
              i('endChecklist'),
              i('group'),
              i('identify'),
              i('identifyAnonymous'),
              i('startFlow'),
              i('startWalk'),
              i('track'),
              i('updateGroup'),
              i('updateUser'),
              (e = !1),
              (t['isIdentified'] = function () {
                return e;
              });
          }
        })();

        userflow.init(ufkey);
        userflow.identify(user_id, {
          name: user_name,
          email: user_email,
          signed_up_at: new Date(user_date_added * 1000).toISOString(),
        });
      }
    }
  };

  ////// guided tour data attribs check
  const is_userflow_attribs = function () {
    if (currentScript.hasAttribute('data-user-id') && currentScript.hasAttribute('data-user-name') && currentScript.hasAttribute('data-user-email') && currentScript.hasAttribute('data-date-added')) {
      window.is_attribs_guided_tour_enabled = true;
    } else {
      window.is_attribs_guided_tour_enabled = false;
    }
  };
  ////////////////////////////////////////
  function loadScopeScript(visitor_ref, support_lib_id, visitor_email, visitor_name) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function(w, u, d){var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};
      var l = function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;
      s.src='https://code.upscope.io/MaFSfdNejL.js';
      var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};
      if(typeof u!=="function"){w.Upscope=i;l();}})(window, window.Upscope, document);

      Upscope('init');
      Upscope('updateConnection', {
        uniqueId: ${JSON.stringify(visitor_ref)},
        identities: [${JSON.stringify(support_lib_id)}, ${JSON.stringify(visitor_email)}, ${JSON.stringify(visitor_name)}, ${JSON.stringify(visitor_ref)}]
      });
      Upscope('getShortId', shortid => {
        console.log(shortid);
      });
      Upscope('reset');
    `;
    document.head.appendChild(script);
  }  

  const post_message_calls = () => {
    var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';
    window.addEventListener('beforeunload', function() {
      const iframe = document.getElementById('modal_support_frame');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage('widgetUnloaded', '*');
      }
    });

    // Listen to message from child window
    eventer(
      messageEvent,
      function (e) {
        var key = e.message ? 'message' : 'data';
        var data = e[key];
        // console.log(`data: ${JSON.stringify(data)}`);
        const draggingActive = document.querySelector('.is-not-dragging');
        const divElement = document.querySelector('#advance_modal_support');
        const dragablebutton = document.querySelector('#helpDeskCtrlAdvBR');
        if (!document.body.contains(draggingActive) && typeof dragablebutton !== 'undefined' && dragablebutton && typeof divElement !== 'undefined' && divElement) {
          const distanceToRight = window.innerWidth - (divElement.offsetLeft + divElement.offsetWidth);
          if (data == 'expand') {
            document.body.classList.add('expand_iframe');
            if (distanceToRight < 20000) {
              document.body.classList.add('expand_iframe_from_right2left');
            }
          } else if (data == 'unexpand') {
            document.body.classList.remove('expand_iframe');
            document.body.classList.remove('expand_iframe_from_right2left');
          }
        } else {
          if (data == 'expand') {
            document.body.classList.add('expand_iframe');
          } else if (data == 'unexpand') {
            document.body.classList.remove('expand_iframe');
          }
        }
        if (data && typeof data === 'object' && 'compactWidget' in data) {
          if (data.compactWidget) {
            document.body.classList.add('compact-widget');
            document.body.classList.add('compact-toolbar');
            window.compact_widget = true;
          } else {
            // if (window.compact_widget === false) setup_dragable_widget_icon();
            document.body.classList.remove('compact-widget');
            document.body.classList.remove('compact-toolbar');
          }
        }
        if (data && typeof data === 'object' && 'event' in data) {
          if (data.event === 'addCompactClass') {
            document.body.classList.add('compact-widget');
            setup_dragable_widget_icon();
            window.expendedState_compact = true;
          } else if (data.event === 'removeCompactClass') {
            document.body.classList.remove('compact-widget');
            setup_dragable_widget_icon();
            window.expendedState_compact = false;
          } else if (data.event === 'chat_info') {
            var selected_visitor_data = data.data;
            var selected_visitor_ref = '';
            var selected_visitor_support_lib_id = '';
            var selected_visitor_email = '';
            var selected_visitor_name = '';

            if (typeof selected_visitor_data === 'object') {
              if (selected_visitor_data.hasOwnProperty("visitor_ref")) {
                selected_visitor_ref = selected_visitor_data.visitor_ref;
              }

              if (selected_visitor_data.hasOwnProperty("support_lib_id")) {
                selected_visitor_support_lib_id = selected_visitor_data.support_lib_id;
              }

              if (selected_visitor_data.hasOwnProperty("visitor_email")) {
                selected_visitor_email = selected_visitor_data.visitor_email;
              }

              if (selected_visitor_data.hasOwnProperty("visitor_name")) {
                selected_visitor_name = selected_visitor_data.visitor_name;
              }
            }

            // console.log("Look to add the Median script for visitor: ", selected_visitor_ref, selected_visitor_support_lib_id, selected_visitor_email, selected_visitor_name);
            loadScopeScript(selected_visitor_ref, selected_visitor_support_lib_id, selected_visitor_email, selected_visitor_name);
          }
        }
        if (data && typeof data === 'object' && 'event' in data) {
          // console.log(`data.event: ${JSON.stringify(data.event)}`);
          if (data.event.type === 'addClassBottomLinks' && typeof data.event.noOfLinks === 'number') {
            const noOfLinks = data.event.noOfLinks;
            if (noOfLinks >= 1 && noOfLinks <= 10) {
              document.body.classList.add(`cw-links-${noOfLinks}`);
            }
          }
        }
      },
      false
    );
  };

  window.mid = ''; //Modal ID
  window.lw = ''; //Library Widget
  window.wt = 'advanced'; //Widget Type - classic / advanced
  window.wp = 'top'; //Widget Position  - top, bottom_left, bottom_right
  window.wc = '#000000';
  window.p = '';
  window.positiontop = 0;
  window.positionleft = 0;
  window.cp_ark = '';
  window.egw = false; //Global Widget

  let wurl = '';
  if (window.data_app == 'gen' && window.data_ark) {
    let clk = data_ark;
    wurl = 'https://auth.locationapi.co/resources1?k=' + clk + '&v=' + Date.now();
  } else {
    let cl = location.host;
    wurl = 'https://auth.locationapi.co/resources1?d=' + cl + '&v=' + Date.now();
  }

  function hlpt_jq_cccss_ms() {
    var t = document.createElement('style');
    t.id = 'checkin_css_ms';
    s = `.hdctrl_ms{
        color:#FFFFFF; 
        background-color:#000000; 
        border-color:rgba(0, 0, 0, 0.1);
    }
    :root {
      --secondaryColorRed-light: rgb(255, 109, 41, 0.1);
      --secondaryColorRed-dark: rgb(194, 62, 0, 1);
      --colorWhite: rgb(255, 255, 255, 1);
      --colorGray: rgb(242, 242, 242, 1);
      --colorBlack: rgb(0, 0, 0, 1);
      --colorBlack-text: rgb(0, 0, 0, .6);
      --colorBlack-shadow: rgb(0, 0, 0, 0.7);
      --secondaryColorRed-dark-shadow: rgb(255, 109, 41, 0.1);
      --secondaryColorRed-dark-shadow: rgb(255, 109, 41, 0.1);
      --secondaryColorGray: rgb(26, 26, 26);
      --secondaryColorGray-light: rgb(115, 115, 115);
      --colorBlack-Button-Opacity: rgb(0, 0, 0, 0.1);
  
    }
    .hdctrl_ms:hover{        
    }
    #support_modal_support{
      left: unset !important;
      position:fixed;
      right:0 !important;
      top:0 !important;
      height:100%;
      width:45%;
      min-width:400px;
      z-index:11111;
    }
    .ms_button.ms_widget.btn {
      background: none !important;
    }
    
    
    #advance_modal_support {
      z-index: 2147483000;
      position: fixed;
      // top: 30px;
      border-radius: 15px;
      right: 30px;
      height: 85vh;
      min-height: 80px;
      transform: scale(0);
      width: 400px;
      opacity: 0;

      max-height: 704px;
      box-shadow: rgba(0, 0, 0, 0.40) 0px 5px 40px;
      /* box-shadow: 0 1.1rem .8rem -0.5rem rgba(0, 0, 0, 0.4) !important; */
      border-radius: 16px;
      overflow: hidden;
      transform-origin: right top 0px;
      transition: width 500ms ease 0s, height 500ms ease 0s, max-height 500ms ease 0s, transform 500ms cubic-bezier(0, 1.2, 1, 1) 0s, opacity 83ms ease-out 0s;
      pointer-events: all;

      scrollbar-color: #b1b7be #dde1e7 !important;
      scrollbar-width: thin !important;

      transform: scale(1) !important;
      opacity: 1 !important;
      background-color: #f8f8f8 !important;
    }
     
    .modal_frame  {
      position: relative;
      height: 704px;
      max-height: 704px;
   } 
      
    .modal_loading {
      position: absolute;
      top: 0% !important;
      left: 0% !important;
      width: 400px !important;
      height: 700px !important;
      z-index: 0;
    }

    .modal_loading svg {
      width: 150px;
      height: 150px;
      color: var(--primaryColor);
      position: relative;
      top: 35%;
      left: 33%;
    }

    #modal_support_frame {
      z-index: 2147483000;
    }

    #advance_modal_support .closeme {
      width: 25px;
      height: 25px;
      border: 2px solid var(--colorWhite);
      border-radius: 50%;
      position: absolute;
      background-color: transparent;
      background-color: var(--primaryColor);
      top: 20px;
      right: 20px;
      font-size: 15px;
      text-align: center;
      line-height: 20px;
      color: white;
    }

    .expanded-article {
      width: 800px !important;
      max-height: unset !important;
      height: 88vh !important;
      top: 20 !important;

      -webkit-transition: -webkit-transform 500ms ease-in-out;
      transition: -webkit-transform 500ms ease-in-out;
      transition: max-height 500ms ease-in-out;
      transition: max-height 500ms ease-in-out, -webkit-transform 500ms ease-in-out;
    }

    .expand-btn-widget {
        border-radius: 8px;
        border: none;
        color: var(--primaryColor);
        right: 55px;
        top: 20px;
        padding: 5px;
    }

    .expand-btn-widget svg {
        width: 25px;
        height: 25px;
    }

    .expand-btn-widget {
        transform: rotate(90deg);
    }
   
    .expand-btn-widget svg {
        width: 22px;
        height: 22px;
    }

    /* advanced widget positions */
    
    .help-ico-top-left-pos,
    .help-ico-bottom-left-pos {
        z-index: 2147483000;
        position: fixed;
        top: 5px;
        right: 100px;
        transition: width 500ms ease 0s,
        height 500ms ease 0s,
        max-height 500ms ease 0s,
        transform 500ms cubic-bezier(0, 1.2, 1, 1) 0s,
        opacity 83ms ease-out 0s;
        pointer-events: all;
        width: 35px !important;
    }
    .help-ico-bottom-right-pos {
        z-index: 2147483000;
        position: fixed;
        bottom: 30px;
        right: 30px;
        transition: width 500ms ease 0s,
        height 500ms ease 0s,
        max-height 500ms ease 0s,
        transform 500ms cubic-bezier(0, 1.2, 1, 1) 0s,
        opacity 83ms ease-out 0s;
        pointer-events: all;
        display: block !important;
        width: 32px !important;
        height: 32px !important;
        text-decoration: none !important;
      }

      .force-hidden {
        display: none !important;
      }
    .help-ico-top-right-default-pos {
        top: 5px !important;
        right: 100px !important;
    }
 
    .help-ico-top-left-pos {
        top: 80px !important;
        left: 30px !important;
    }

    .help-ico-bottom-left-pos {
      top: auto !important;
      bottom: 15px !important;
      left: 140px !important;
    }

    .help-awidget-top-right-default-pos {
        top: 65px !important;
        right: 30px !important;
    }

   .help-awidget-bottom-right-pos {
        /* top: auto !important; 
        bottom: 30px !important;
        right: 30px !important;*/
    }

    .is-not-dragging #advance_modal_support {
        // left: auto !important;
        // top: auto !important; 
        bottom: 92px !important;
        right: 30px !important;
    }

    .help-awidget-top-left-pos {
        top: 65px !important;
        left: 30px !important;
    }

    .help-awidget-bottom-left-pos {
        top: auto !important;
        bottom: 80px !important;
        left: 30px !important;
    }

    .widget-toggle {
      /* position: relative; */
      background-color: var(--primaryColor);
      width: 33px;
      height: 33px;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 0 40px -5px rgba(0, 0, 0, 0.1);
      /* right: 46px;
      top: -22px; */
      transform: scale(1) !important;
    }
    
    .widget-toggle-icon {
        padding: 7px;
        text-align: center;
        position: relative;
        z-index: 99999 !important;
    }
    
    .widget-toggle-icon svg {
        color: var(--colorWhite);
        width: 20px;
        height: 20px;
    }
    
    .widget-toggle:hover {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
        -webkit-transition: -webkit-transform 0.28s ease-in-out;
        transition: -webkit-transform 0.28s ease-in-out;
        transition: transform 0.28s ease-in-out;
        transition: transform 0.28s ease-in-out, -webkit-transform 0.28s ease-in-out;
    }
  
    .toggle-up-close {
        display: none;
    }

    .widget_opened .toggle-up-close {
        position: relative;
        top: -34px;
        background-color: var(--primaryColor);
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 0 40px -5px rgba(0, 0, 0, 0.1);
        display: block;
        -webkit-transition: -webkit-transform 0.28s ease-in-out;
        transition: -webkit-transform 0.28s ease-in-out;
        transition: transform 0.28s ease-in-out;
        transition: transform 0.28s ease-in-out, -webkit-transform 0.28s ease-in-out;
        z-index:999999 !important;
        display: flex !important;
        text-align: center !important;
        align-items: center !important;
        justify-content: center !important;
    }

    .help-ico-bottom-right-pos.widget_opened .widget-toggle, 
    .help-ico-bottom-left-pos.widget_opened .widget-toggle, 
    .help-ico-bottom-right-pos .widget-toggle,
    .help-ico-bottom-left-pos .widget-toggle {
      transform: scale(1.6) !important;
      box-shadow: rgba(0, 0, 0, 0.40) 0px 5px 40px;
    } 
    
    .help-ico-bottom-right-pos.widget_opened .widget-toggle, 
    .help-ico-bottom-left-pos.widget_opened .widget-toggle {
      rotate: 180deg;
    } 

    .showup{
      display: block;
    }

    .closemetoggle {
      font-size: 19px;
      line-height: 30px;
      color: #fff !important;
      text-align: center;
      display: block;
      position: relative;
      top:0px;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
      .closemetoggle svg {
      width: 20px !important;
      color: #fff !important;
    }
    div#userflow-ui div.userflowjs-launcher{
      font-weight: bold;background-color: rgb(31,175,118);background:linear-gradient(90deg, rgba(31,175,118,1) 0%, rgba(5,106,151,1) 100%);font-size: 14px;margin-left: -1%;letter-spacing: 1px;font-family: "Open Sans";height: 38px;width: auto;margin-top: 2px;border-radius: 10px;justify-content: center;align-items: center;display: flex;outline: 1px solid #9fbed3;outline-offset: 3px;
    }

    .hl_header--controls a {
      z-index: 999999 !important;
    }

    .loadernew-hl {
      background: transparent !important;
      /*
      width: 200px;
      margin: auto;
      position: absolute;
      left: 25%;
      top: 5%;
      */
    }

  .loadernew-hl svg {
      color: var(--primaryColor);
      -moz-animation: cssAnimation 0s ease-in 1.50s forwards;
      -webkit-animation: cssAnimation 0s ease-in 1.50s forwards;
      -o-animation: cssAnimation 0s ease-in 1.50s forwards;
      animation: cssAnimation 0s ease-in 1.50s forwards;
      -webkit-animation-fill-mode: forwards;
      animation-fill-mode: forwards;
      background: none;
      opacity: 0.75;
      
    }
    
    @keyframes cssAnimation {
        to {
            width: 0;
            height: 0;
            overflow: hidden;
        }
    }
    
    @-webkit-keyframes cssAnimation {
        to {
            width: 0;
            height: 0;
            visibility: hidden;
        }
    }
    
    /* 3 dots animations forr toggle icon */
    .toggle-icon-new-chat {
        background-color: var(--primaryColor);
        border-radius: 100%;
        position: relative;
        cursor: pointer;
        transform: scale(1.15);
        margin: auto;
        z-index: 99999 !important;
    }

    .toggle-icon-new-chat svg {
        transform: scale(1);
        
    }

    .toggle-icon-new-chat .dotsicon {
        color: var(--primaryColor);
  }

  .widget-toggle-icon:hover .toggle-icon-new-chat .dotsicon{
      color: var(--colorWhite) !important;
  }
  
  .toggle-icon-new-chat:hover .dotsicon {
        color: var(--colorWhite) !important;
  }

  .toggle-icon-new-chat:hover .dot {
        background-color: var(--primaryColor);
  }

  .toggle-icon-new-chat:hover>* {
        animation: jump 800ms 10s;
  }

  .dots-cont:hover>* {
        animation: jump 800ms 10s;
  }

  .dotsicon {
        color: var(--primaryColor);
  }

  .help-ico-top-right-default-pos .dots-cont {
      bottom: -7px;
  }

  .help-ico-top-right-default-pos .toggle-icon-new-chat {
      transform: scale (1.2);
  }

  .dots-cont {
    position: absolute;
    bottom: 0px;
    left: 0px;
    border-radius: inherit;
    width: inherit;
    margin: auto;
    padding-left: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
    height: 35px;
    width: 34px;
    z-index: 99999 !important;
  }

    body.genwidget .dots-cont {
    padding-top: 13px !important;
  }
 /*
  body.memberships .close-adv-widget-x {  
    top: 25px !important;
    right: 32px !important;
    opacity: 0.6 !important;
    z-index: -1 !important;
  }
*/
  body.memberships .close-adv-widget-x:hover {  
    opacity: 0.9 !important;
  }
  /*
  body.memlogin .ms_button.ms_widget {
    display: none !important;
  }
  */
  body.genwidget .close-adv-widget-x.home,
  body.genwidget .close-adv-widget-x.message,
  body.genwidget .close-adv-widget-x.contact {  
    top: 25px !important;
    right: 25px !important;
    opacity: 0.6 !important;
  }
  body.genwidget .close-adv-widget-x.home:hover,
  body.genwidget .close-adv-widget-x.message:hover,
  body.genwidget .close-adv-widget-x.contact:hover {  
    opacity: 0.9 !important;
  }
  
  body .close-adv-widget-x {
    background: none !important;
    border: 0px !important;
    cursor: pointer !important;    
  }

  body .close-adv-widget-x i {
    font-family: "Font Awesome 6 Pro" !important;
  }
  
  body.genwidget .help-ico-bottom-left-pos {
    left: 20px !important;
    background: transparent !important;
    border: none !important;
  }

  .dot {
    width: 3px;
    height: 3px;
    background: var(--primaryColor);
    /*
    background-color: var(--colorWhite);
    */
    display: inline-block;
    border-radius: 100%;
    right: 0px;
    bottom: 0px;
    margin: 0px 0.5px;
    position: relative;
    /*
    animation: jump 1s infinite;
    */
    margin-bottom: 10px;
  }

  .dots-cont:hover>* {
      animation: jump 800ms 10s;
  }

  .dots-cont .dot-1 {
      -webkit-animation-delay: 100ms;
      animation-delay: 100ms;
  }

  .dots-cont .dot-2 {
      -webkit-animation-delay: 200ms;
      animation-delay: 200ms;
  }

  .dots-cont .dot-3 {
      -webkit-animation-delay: 300ms;
      animation-delay: 300ms;
  }

  @keyframes jump {
      0% {
          bottom: 0px;
      }

      20% {
          bottom: 4px;
      }

      40% {
          bottom: 0px;
      }
  }

  /* 3 dots animation and toggle new button upto here */

  .close_modal_popup{position:absolute; top:3%;right:6%; font-size:24px; opacity:0;}
  .loadernew svg {
    color: var(--primaryColor-hover);
  }
  
  .expand_iframe #advance_modal_support {width: 800px;  height: 90vh; max-height: 90vh; transition: width 0.5s, height 0.5s; max-height 0.5s; 
    transition: width 500ms ease 0s, height 500ms ease 0s, max-height 500ms ease 0s, transform 500ms cubic-bezier(0, 1.2, 1, 1) 0s, opacity 83ms ease-out 0s;
  }

  .expand_iframe_from_right2left #advance_modal_support {
    left: auto !important;
    top: auto !important;
    right: 30px !important;
    bottom: 90px !important;
    width: 800px !important;  
    height: 89vh; 
    max-height: 89vh; 
    transition: width 0.5s, 
    height 0.5s; 
    max-height 0.5s; 
    transition:  left 500ms ease 1s, right 500ms ease 1s, width 500ms ease 0s, height 500ms ease 0s, max-height 500ms ease 0s, transform 500ms cubic-bezier(0, 1.2, 1, 1) 0s, opacity 83ms ease-out 0s;
  }

  .expand_iframe_from_right2left #helpDeskCtrlAdvBR {
    left: auto !important;
    top: auto !important;
    right: 30px !important;
    bottom: 30px !important;
  }

  #widget-iframe {
    width: 320px !important;
  }

  .help-awidget-bottom-right-posdrag {
    display: none;
    width: 405px;
    height: 85vh;
    background-color: transparent;
    position: fixed;
    border: 0px solid #FFF;
    border-radius: 20px;
    z-index: -1;
    align-items: center;
    justify-content: center;
    min-height: 80px;
    max-height: 704px;
    bottom:50px;
    right: 50px;

  }

  /* Classic Widget Icon */
    #helpDeskCtrlAdvBR .classic-icon, #helpDeskCtrlAdvBL .classic-icon, #helpDeskCtrlAdvTop .classic-icon {
    background-color: var(--primaryColor);
    border-radius: 500px;
    height: 50px !important;
    width: 50px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    text-decoration: none !important;
  }

    #helpDeskCtrlAdvBR, #helpDeskCtrlAdvBL, #helpDeskCtrlAdvTop {
    text-decoration: none !important;
  }

  #helpDeskCtrlAdvBR .classic-icon i, #helpDeskCtrlAdvBL .classic-icon i, #helpDeskCtrlAdvTop .classic-icon i {
    font-weight: bold !important;
    font-size: 24px;
    color: #FFF !important;
  }
  #helpDeskCtrlAdvTop .classic-icon {
    height: 32px !important;
    width: 32px !important;
  }

  #helpDeskCtrlAdvTop .classic-icon i {
    font-size: 18px;
  }

  #helpDeskCtrlAdvTop .dots-cont {
    height: 34px;
  }
  .close-adv-widget-x {
    position: absolute !important;
    z-index: 99999999999 !important;
    width: 10px !important;
    height: 10px !important;
    top: 3px !important;
    right: 8px !important;
    opacity: 0.2;
    border-radius: 100px;
  }
  
  .close-adv-widget-x:hover {
    opacity: 1;
  }
  .close-adv-widget-x i {
    font-size: 18px !important;
    font-weight: 800  !important;
    font-family: "Font Awesome 5 Free" !important;
  }

  #CalendarsFeatureDiscovery{
    order: -1;
  }
    .cp-icon {
    transform: rotate(90deg);
  }

  .sidebar-v2-agency #sidebar-v2 #location-switcher-sidbar-v2 .hl_v2-location_switcher {
    z-index: 999;
  }
  /* guided tour */
  body.gt-hide #userflow-ui,
  body.gt-hide #userflow-ui .userflow-uiuserflowjs-launcher {
    display: none !important;
  }
  /* end of guided tour */

  /* compact widget */
  body.compact-widget.compact-toolbar #advance_modal_support {
    max-height: 330px !important;
    border-radius: 20px !important;
    width: 300px !important;
  }

  body.compact-widget.compact-widget--hc-1.compact-widget--hct-1.compact-toolbar #advance_modal_support {
    max-height: 200px !important;
  }

  body.compact-widget.compact-widget--hc-1.compact-toolbar #advance_modal_support,
  body.compact-widget.compact-widget--hct-1.compact-toolbar #advance_modal_support {
    max-height: 245px !important;
  }

 body.compact-widget.compact-toolbar .help-awidget-bottom-right-posdrag,
 body.compact-widget.compact-widget--hc-1.compact-toolbar .help-awidget-bottom-right-posdrag,
 body.compact-widget.compact-widget--hct-1.compact-toolbar .help-awidget-bottom-right-posdrag,
 body.compact-widget.compact-widget--hc-1.compact-widget--hct-1.compact-toolbar .help-awidget-bottom-right-posdrag {
    display: none;
    max-height: 330px !important;
    width: 285px !important;
    background-color: transparent;
    position: fixed;
    border: 0px solid #FFF;
    border-radius: 20px;
    z-index: -1;
    align-items: center;
    justify-content: center;
    min-height: 80px;
    bottom:50px;
    right: 50px;
  }

  
 body.compact-widget.compact-widget--hc-1.compact-toolbar .help-awidget-bottom-right-posdrag,
 body.compact-widget.compact-widget--hct-1.compact-toolbar .help-awidget-bottom-right-posdrag {
    max-height: 265px !important;
  }
/*
  body.compact-widget.compact-widget--hc-1.compact-widget--hct-1.compact-toolbar {
    max-height: 200px !important;
  }
  */

  /* */
  body.compact-widget.compact-toolbar.cw-links-1 #advance_modal_support {
    max-height: 115px !important;
  }
    body.compact-widget.compact-widget--hc-1.compact-widget--hct-1.compact-toolbar.cw-links-1 #advance_modal_support {
    max-height: 115px !important;
  }
  body.compact-widget.compact-toolbar.cw-links-2 #advance_modal_support {
    max-height: 160px !important;
  }
    body.compact-widget.compact-widget--hc-1.compact-widget--hct-1.compact-toolbar.cw-links-2 #advance_modal_support {
    max-height: 160px !important;
  }
  body.compact-widget.compact-toolbar.cw-links-3 #advance_modal_support {
    max-height: 205px !important;
  }
    body.compact-widget.compact-widget--hc-1.compact-widget--hct-1.compact-toolbar.cw-links-3 #advance_modal_support {
    max-height: 205px !important;
  }
  body.compact-widget.compact-toolbar.cw-links-4 #advance_modal_support {
    max-height: 245px !important;
  }
    body.compact-widget.compact-widget--hc-1.compact-widget--hct-1.compact-toolbar.cw-links-4 #advance_modal_support {
    max-height: 245px !important;
  }
    body.compact-widget.compact-toolbar.cw-links-5 #advance_modal_support {
    max-height: 290px !important;
  }
    body.compact-widget.compact-widget--hc-1.compact-widget--hct-1.compact-toolbar.cw-links-5 #advance_modal_support {
    max-height: 290px !important;
  }
  body.compact-widget.compact-toolbar.cw-links-6 #advance_modal_support {
    max-height: 330px !important;
  }
    body.compact-widget.compact-widget--hc-1.compact-widget--hct-1.compact-toolbar.cw-links-6 #advance_modal_support {
    max-height: 330px !important;
  }
  body.compact-widget.compact-toolbar.cw-links-7 #advance_modal_support {
    max-height: 375px !important;
  }
    body.compact-widget.compact-widget--hc-1.compact-widget--hct-1.compact-toolbar.cw-links-7 #advance_modal_support {
    max-height: 375px !important;
  }
  body.compact-widget.compact-toolbar.cw-links-8 #advance_modal_support {
    max-height: 415px !important;
  }
     body.compact-widget.compact-widget--hc-1.compact-widget--hct-1.compact-toolbar.cw-links-8 #advance_modal_support {
    max-height: 415px !important;
  }
  body.compact-widget.compact-toolbar.cw-links-9 #advance_modal_support {
    max-height: 455px !important;
  }
     body.compact-widget.compact-widget--hc-1.compact-widget--hct-1.compact-toolbar.cw-links-9 #advance_modal_support {
    max-height: 455px !important;
  }
  body.compact-widget.compact-toolbar.cw-links-10 #advance_modal_support {
    max-height: 500px !important;
  }
     body.compact-widget.compact-widget--hc-1.compact-widget--hct-1.compact-toolbar.cw-links-10 #advance_modal_support {
    max-height: 500px !important;
  }
  body.compact-widget.compact-toolbar #advance_modal_support {
    top: unset;
    right: 30px;
    bottom: 90px;
    transform-origin: right bottom 0px !important;
    transition: none !important;
    
  }

 
  body.compact-toolbar.is-not-dragging #advance_modal_support {
    top: unset !important;
    bottom: 80px !important;
    transform-origin: right bottom 0px;
      transition: width 500ms ease 0s, height 500ms ease 0s, max-height 500ms ease 0s, transform 500ms cubic-bezier(0, 1.2, 1, 1) 0s, opacity 83ms ease-out 0s;
      pointer-events: all;
  }
  #helpDeskCtrlAdvTop {
     margin-right: -10px !important;
  }
 
  body.compact-toolbar.is-not-dragging  #helpDeskCtrlAdvBR {
    top: unset !important;
  }

  body.compact-toolbar  .close-adv-widget-x {
    display: none !important;
   }
  body.sbv2  #helpDeskCtrlNSW.force-hidden {
    display: none !important;
  }
    a#azFaqCtrl {
    margin-left: 20px !important;
  }
  /* end of compact widget */
  @media screen and (max-width: 1024px), 
      screen and (max-height: 768px) {
    
  }
  @media screen and (max-width: 450px) {
    #advance_modal_support {
        width: 330px !important;
        right: 15px !important;
        max-height: 620px !important;
      }
      
      .expand_iframe #advance_modal_support {
        width: 350px !important;
      }
      }`;

    t.innerHTML = s;
    document.getElementsByTagName('head')[0].appendChild(t);
  }

  const get_widget_url = (ag_mid, hide_contact_tab, hide_chat_tab, manage_by_modal, queue_priority, agency_queue_priority) => {
    var wt = 'advanced';
    if (window.wt) {
      wt = window.wt;
    }
    var widget_url = 'https://dev.modalsupport.com/AdvancedWidget/' + ag_mid + '/dashboard?';
    /* if (wt == 'classic') {
      // widget_url = 'https://hub.modalsupport.net/widget/' + ag_mid + '?';
    } */
   const userData = get_user_data();
    var current_location_id = modal_lid();
    const { user_name, user_email, user_role, user_type } = userData;
    widget_url = widget_url + (widget_url.endsWith('?') ? 'hc=' : '&hc=') + hide_contact_tab;
    widget_url = widget_url + '&hct=' + hide_chat_tab;
    widget_url = widget_url + '&cf=' + manage_by_modal;
    widget_url = widget_url + '&qp=' + queue_priority;
    widget_url = widget_url + '&aqp=' + agency_queue_priority;
    if (user_type) widget_url = widget_url + '&ut=' + user_type;
    if (user_role) widget_url = widget_url + '&ur=' + user_role;
    if (current_location_id) widget_url = widget_url + '&lid=' + current_location_id;
    if (user_name) widget_url = widget_url + '&visitor_name=' + user_name;
    if (user_email) widget_url = widget_url + '&visitor_email=' + user_email; 
    widget_url = widget_url + '&parentURL=' + window.location;
    widget_url = widget_url + '&p=' + window.p;
    if (document.body.classList.contains('IsAdmin')) {
      widget_url = widget_url + '&ma=1';
    }
    //widget_url = widget_url + '&v=' + Date.now();
    return widget_url;
  };

  const open_modal_support = (widget_open_status = 'show') => {
    if (window.is_dragging) {
      return false;
    }
    var wt = 'advanced';
    if (window.wt) {
      wt = window.wt;
    }
    var ag_mid = 'n6YtGUlxahUwbpvzImG7';
    if (window.mid) ag_mid = window.mid;
    var lw = 0;
    if (typeof window.lw !== 'undefined') lw = window.lw;
    let hide_contact = currentScript.getAttribute('data-hide-contact');
    var hide_contact_tab = 0;
    if (hide_contact == 'true') hide_contact_tab = 1;
    var hide_chat = currentScript.getAttribute('data-hide-chat');
    var hide_chat_tab = 0;
    if (hide_chat == 'true') hide_chat_tab = 1;
    var manage_by_modal = 0;
    var queue_priority = 0;
    var agency_queue_priority = 0;
    var ms_div_id = 'advance_modal_support';
    //if (wt == 'classic') ms_div_id = 'support_modal_support';

    var existing_modal_window = document.querySelector('#' + ms_div_id);
   if (!document.body.contains(existing_modal_window)) {
      var widget_url = get_widget_url(ag_mid, hide_contact_tab, hide_chat_tab, manage_by_modal, queue_priority, agency_queue_priority);

      /* let element_html =
        '<div class="loadernew-hl"><svg version="1.1" id="L9" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve"><path fill="currentColor" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="500ms" from="0 50 50" to="360 50 50" repeatCount="indefinite" /></path></svg></div><iframe id="modal_support_frame" width="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder="0" scrolling="yes" data-app_url="' +
        window.location +
        '" src="' +
        widget_url +
        '"style="border:none; width:100%; height:100%;overflow:auto; min-height:100px;"></iframe>'; */
      let element_html =
        '<iframe id="modal_support_frame" width="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder="0" scrolling="yes" data-app_url="' +
        window.location +
        '" src="about:blank" data-src="' +
        widget_url +
        '" style="border:none; width:100%; height:100%;overflow:auto; min-height:100px;"></iframe> ';
      /* if (wt == 'classic') {
        element_html =
          '<iframe id="modal_support_frame" width="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder="0" scrolling="yes" data-app_url="' +
          window.location +
          '" src="' +
          widget_url +
          '"style="border:none; width:100%; height:100%;overflow:auto; min-height:100px;"></iframe><a href="javascript:0;" class="close_modal_popup" onclick="document.getElementById(\'support_modal_support\').style.display=\'none\'; if(document.body.contains(document.querySelector(\'#chat-widget-container\'))){ $(\'#chat-widget-container\').hide(); } return false;"><i class="fa fa-times text-dark"></i></a>';
      } */

      const hdli = document.createElement('div');
      hdli.innerHTML = element_html;
      hdli.setAttribute('id', ms_div_id);
      if (widget_open_status == 'hide') {
        hdli.style.display = 'none';
        //hdli.classList.add('force-hidden');
        do_force_hidden(hdli, 'get_widget_url');
        remove_widget_source();
      }
      if (window.wp == 'top') {
        hdli.classList.add('help-awidget-top-right-default-pos');
      } else if (window.wp == 'bottom_left') {
        hdli.classList.add('help-awidget-bottom-left-pos');
      } else if (window.wp == 'bottom_right') {
        hdli.classList.add('help-awidget-bottom-right-pos');
      }
      document.body.appendChild(hdli);

      /* if (typeof window.wt !== 'undefined' && window.wt == 'classic') {
        setTimeout(function () {
          document.querySelector('.close_modal_popup').style.opacity = 1;
        }, 5000);
        hlpt_displayChat(widget_open_status);
      } */
    } else {
      existing_modal_window.style.display = 'block';
      existing_modal_window.classList.remove('force-hidden');
      add_widget_source("open_modal_support");
      /* if (typeof window.wt !== 'undefined' && window.wt == 'classic') {
        setTimeout(function () {
          document.querySelector('.close_modal_popup').style.opacity = 1;
        }, 5000);
        hlpt_displayChat(widget_open_status);
      } */
    }
    if (!window.is_rePositioned) {
      return false;
    }
    const dragContainer = document.querySelector('.help-awidget-bottom-right-pos');
    if (typeof dragContainer !== 'undefined' && dragContainer) {
      dragContainer.style.left = window.positionleft;
      dragContainer.style.top = window.positiontop;
    }
  };
  
  // function add_widget_source(srcloc){
  //   var current_url = document.location.href;    
  //   const locationMatch = current_url.match(/\/location\/([^\/]+)/);
  //   const currentLocationId = locationMatch ? locationMatch[1] : null;    
  //   const previousLocationId = sessionStorage.getItem('previousLocationId');    
  //   if (currentLocationId) {
  //     sessionStorage.setItem('previousLocationId', currentLocationId);
  //   }    
  //   const selected_iframe = document.getElementById('modal_support_frame');
  //   if (selected_iframe && selected_iframe.hasAttribute('data-src')) {
  //       const existingSrc = selected_iframe.getAttribute('src');
  //       const dataSrc = selected_iframe.getAttribute('data-src');
        
  //       if (dataSrc && dataSrc !== existingSrc) {
  //           const shouldUpdate = !existingSrc || 
  //                              !previousLocationId || 
  //                              currentLocationId !== previousLocationId || 
  //                              existingSrc === 'about:blank';
            
  //           if (shouldUpdate) {
  //               selected_iframe.setAttribute('src', dataSrc);
  //           }
  //       }
  //   }
  // }

  function add_widget_source(srcloc){
    const selected_iframe = document.getElementById('modal_support_frame');
    if (selected_iframe && selected_iframe.hasAttribute('data-src')) {
        const existingSrc = selected_iframe.getAttribute('src');
        const dataSrc = selected_iframe.getAttribute('data-src');        
        if (dataSrc && dataSrc !== existingSrc) {
            const shouldUpdate = !existingSrc || existingSrc === 'about:blank';            
            if (shouldUpdate) {
                selected_iframe.setAttribute('src', dataSrc);
            }
        }
    }
  }

  function remove_widget_source(){
    const selected_iframe = document.getElementById('modal_support_frame');
    if (selected_iframe && selected_iframe.hasAttribute('src')) {
      const srcValue = selected_iframe.getAttribute('src');
      if ( srcValue && srcValue != 'about:blank' ) {
        selected_iframe.setAttribue('data-src', srcValue);
        selected_iframe.removeAttribute('src');
      }
    }
  }

  function do_force_hidden(selector, source){
    if (!selector.classList.contains('force-hidden')) {
        // console.log("do_force_hidden: ", source)
        selector.classList.add('force-hidden');
    } else {
        // console.log('Class "force-hidden" is already applied');
    }
  }

  function hlpt_new_sidebar_widget() {
    var do_sidebarv2 = 'false';
    if (document.body.contains(document.querySelector('#sidebar-v2 .hl_nav-header nav'))) {
      if (currentScript.hasAttribute('data-sidebar-v2')) {
        do_sidebarv2 = currentScript.getAttribute('data-sidebar-v2');
      }

      if (currentScript.hasAttribute('data-sidebar')) {
        do_sidebarv2 = currentScript.getAttribute('data-sidebar');
      }
    }

    if (do_sidebarv2 == 'true') {
      var linkId = 'helpDeskCtrlNSW';
      var link_obj = document.querySelector('#' + linkId);
      //console.log("Display sidebar widget!");

      var widget_class = 'ms_widget_sb';
      //if (window.wt == 'classic') widget_class = 'ms_classic_sb';

      var linkIcon = 'fas fa-question';
      var linkURL = 'javascript:void(0);';
      var linkName = window.data_help_title;
      var div = $('#' + linkId);
      if (!div.length) {
        let nh =
          '<a id="' +
          linkId +
          '" href="' +
          linkURL +
          '" class="' +
          widget_class +
          ' w-full group px-3 flex items-center justify-left md:justify-left lg:justify-left xl:justify-start text-sm rounded-md cursor-pointer custom-link font-medium opacity-70 hover:opacity-100 py-2 md:py-2"><span class="h-5 w-5 mr-2"><i class="' +
          linkIcon +
          '"></i></span><span class="sr-only1">' +
          linkName +
          '</span></a>';
        $('#sidebar-v2 .hl_nav-header nav').append(nh);
      }
    }
  }

  function hlpt_classic_widget() {
    if (typeof window.wt !== 'undefined' && window.wt == 'classic') {
      var linkId = 'helpDeskCtrl';
      var linkIcon = 'fas fa-question';
      var linkURL = 'javascript:void(0);';
      var linkName = window.data_help_title;
      var div = $('#' + linkId);
      if (!div.length) {
        let nh =
          '<a id="' +
          linkId +
          '" href="' +
          linkURL +
          '" class="ms_button ms_classic btn btn-circle hdctrl_ms hdctrl_msOrd"><i class="' +
          linkIcon +
          '"></i><span class="sr-only">' +
          linkName +
          '</span></a>';
        $('.hl_header--controls:last-of-type').prepend(nh);
      }
    }
  }

  /// email builder and campaign help widget icon z-index refix ////
  function remove_zidx_email_builder() {
    const helpIcon = document.querySelector('.help-ico-bottom-right-pos');
    if (helpIcon) {
      if (window.location.href.includes('/emails/campaigns/create/') || window.location.href.includes('/emails/create/')) {
        helpIcon.style.zIndex = '-1';
      } else {
        helpIcon.style.zIndex = '2147483000';
      }
    }
  }

  function hlpt_advance_widget() {
    if (window.is_rePositioned) {
      return false;
    }

    if (!window.is_agency_widget_enabled) {
      return false;
    }
    if (!window.egw) {
      return false;
    }
    if (typeof window.wt === 'undefined' || (typeof window.wt !== 'undefined' && window.wt == 'advanced')) {
      var linkIcon = 'fas fa-question';
      var linkId = '';
      if (window.wp == 'top') {
        linkId = 'helpDeskCtrlAdvTop';
      } else if (window.wp == 'bottom_left') {
        linkId = 'helpDeskCtrlAdvBL';
      } else if (window.wp == 'bottom_right') {
        linkId = 'helpDeskCtrlAdvBR';
      }

      /* if (window.wt == 'classic') {
        linkId = 'helpDeskCtrl';
      } */
      var link_obj = document.querySelector('#' + linkId);

      var linkName = '';
      if (window.data_app == 'hl') {
        linkName = window.data_help_title;
      }

      if (window.wp == 'top') {
        var linkURL = 'javascript:void(0);';
        var div = $('#' + linkId);
        if (!div.length) {
          let nh =
            '<a id="' +
            linkId +
            '" href="' +
            linkURL +
            '" class="ms_button ms_widget btn btn-circle hdctrl_ms1 hdctrl_msOrd help-ico-top-right-default-pos"><div class="widget-toggle"><div class="widget-toggle-icon"><div class="toggle-icon-new-chat"><svg viewBox="0 0 32 32"><path fill="currentColor" d="M12.63,26.46H8.83a6.61,6.61,0,0,1-6.65-6.07,89.05,89.05,0,0,1,0-11.2A6.5,6.5,0,0,1,8.23,3.25a121.62,121.62,0,0,1,15.51,0A6.51,6.51,0,0,1,29.8,9.19a77.53,77.53,0,0,1,0,11.2,6.61,6.61,0,0,1-6.66,6.07H19.48L12.63,31V26.46" class="dotsicon-parent"> </path> <path fill="currentColor" d="M19.57,21.68h3.67a2.08,2.08,0,0,0,2.11-1.81,89.86,89.86,0,0,0,0-10.38,1.9,1.9,0,0,0-1.84-1.74,113.15,113.15,0,0,0-15,0A1.9,1.9,0,0,0,6.71,9.49a74.92,74.92,0,0,0-.06,10.38,2,2,0,0,0,2.1,1.81h3.81V26.5Z" class="dotsicon"> </path> </svg></div><span class="dots-cont"><span class="dot dot-1"></span><span class="dot dot-2"></span><span class="dot dot-3"></span></span></div><div class="toggle-up-close"><i class="closemetoggle" style="transition: all 0.1s ease 0s;" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></svg></i></div></div></i><span class="sr-only">' +
            linkName +
            '</span></a>';

          if (typeof window.wi !== 'undefined' && window.wi == 'classic_icon') {
            nh =
              '<a id="' +
              linkId +
              '" href="' +
              linkURL +
              '" class="ms_button ms_widget btn btn-circle hdctrl_ms1 hdctrl_msOrd help-ico-top-right-default-pos"><div class="classic-icon"><i class="' +
              linkIcon +
              '"></i></div><span class="sr-only">' +
              linkName +
              '</span></a>';
          }

          $('.hl_header--controls:last-of-type').prepend(nh);
        }
      } else if (window.wp == 'bottom_left') {
        var linkURL = 'javascript:void(0);';
        var div = $('#' + linkId);
        if (!div.length) {
          let nh =
            '<a id="' +
            linkId +
            '" href="' +
            linkURL +
            '" class="ms_button ms_widget btn btn-circle hdctrl_ms1 hdctrl_msOrd help-ico-bottom-left-pos"><div class="widget-toggle"><div class="widget-toggle-icon"><div class="toggle-icon-new-chat"><svg viewBox="0 0 32 32"><path fill="currentColor" d="M12.63,26.46H8.83a6.61,6.61,0,0,1-6.65-6.07,89.05,89.05,0,0,1,0-11.2A6.5,6.5,0,0,1,8.23,3.25a121.62,121.62,0,0,1,15.51,0A6.51,6.51,0,0,1,29.8,9.19a77.53,77.53,0,0,1,0,11.2,6.61,6.61,0,0,1-6.66,6.07H19.48L12.63,31V26.46" class="dotsicon-parent"> </path> <path fill="currentColor" d="M19.57,21.68h3.67a2.08,2.08,0,0,0,2.11-1.81,89.86,89.86,0,0,0,0-10.38,1.9,1.9,0,0,0-1.84-1.74,113.15,113.15,0,0,0-15,0A1.9,1.9,0,0,0,6.71,9.49a74.92,74.92,0,0,0-.06,10.38,2,2,0,0,0,2.1,1.81h3.81V26.5Z" class="dotsicon"> </path> </svg></div><span class="dots-cont"><span class="dot dot-1"></span><span class="dot dot-2"></span><span class="dot dot-3"></span></span></div><div class="toggle-up-close"><i class="closemetoggle" style="transition: all 0.1s ease 0s;" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></svg></i></div></div></i><span class="sr-only">' +
            linkName +
            '</span></a>';

          if (typeof window.wi !== 'undefined' && window.wi == 'classic_icon') {
            nh =
              '<a id="' +
              linkId +
              '" href="' +
              linkURL +
              '" class="ms_button ms_widget btn btn-circle hdctrl_ms1 hdctrl_msOrd help-ico-bottom-left-pos"><div class="classic-icon"><i class="' +
              linkIcon +
              '"></i></div><span class="sr-only">' +
              linkName +
              '</span></a>';
          }

          $('body').prepend(nh);
        }
      } else if (window.wp == 'bottom_right') {
        var linkURL = 'javascript:void(0);';
        var div = $('#' + linkId);
        if (!div.length) {
          let nh =
            '<a id="' +
            linkId +
            '" href="' +
            linkURL +
            '" class="ms_button ms_widget btn-circle hdctrl_ms1 hdctrl_msOrd help-ico-bottom-right-pos "><div class="widget-toggle"><div class="widget-toggle-icon"><div class="toggle-icon-new-chat"><svg viewBox="0 0 32 32"><path fill="currentColor" d="M12.63,26.46H8.83a6.61,6.61,0,0,1-6.65-6.07,89.05,89.05,0,0,1,0-11.2A6.5,6.5,0,0,1,8.23,3.25a121.62,121.62,0,0,1,15.51,0A6.51,6.51,0,0,1,29.8,9.19a77.53,77.53,0,0,1,0,11.2,6.61,6.61,0,0,1-6.66,6.07H19.48L12.63,31V26.46" class="dotsicon-parent"> </path> <path fill="currentColor" d="M19.57,21.68h3.67a2.08,2.08,0,0,0,2.11-1.81,89.86,89.86,0,0,0,0-10.38,1.9,1.9,0,0,0-1.84-1.74,113.15,113.15,0,0,0-15,0A1.9,1.9,0,0,0,6.71,9.49a74.92,74.92,0,0,0-.06,10.38,2,2,0,0,0,2.1,1.81h3.81V26.5Z" class="dotsicon"> </path> </svg></div><span class="dots-cont"><span class="dot dot-1"></span><span class="dot dot-2"></span><span class="dot dot-3"></span></span></div><div class="toggle-up-close"><i class="closemetoggle" style="transition: all 0.1s ease 0s;" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></svg></i></div></div></i><span class="sr-only">' +
            linkName +
            '</span></a><div class="help-awidget-bottom-right-posdrag"></div>';

          if (typeof window.wi !== 'undefined' && window.wi == 'classic_icon') {
            nh =
              '<a id="' +
              linkId +
              '" href="' +
              linkURL +
              '" class="ms_button ms_widget btn-circle hdctrl_ms1 hdctrl_msOrd help-ico-bottom-right-pos "><div class="classic-icon"><i class="' +
              linkIcon +
              '"></i></div><span class="sr-only">' +
              linkName +
              '</span></a>';
          }

          $('body').prepend(nh);
        }
      }
    }
    remove_zidx_email_builder();
  } //End Advance Widget

  const hlpt_autoload_support = function () {
    var page_url = document.location.href;
    if (page_url.includes('view=support')) {
      open_modal_support();
    }
  };

  function hlpt_getParentUrl() {
    var isInIframe = parent !== window,
      parentUrl = location.host;
    if (isInIframe) {
      parentUrl = document.referrer;
    }
    if (parentUrl) {
      var a = document.createElement('a');
      a.href = parentUrl;
      parentUrl = a.hostname;
    }
    return parentUrl;
  }

  const hlpt_displayChat = (widget_open_status = 'show') => {
    let hide_chat = 'false';
    if (currentScript.hasAttribute('data-hide-chat')) {
      hide_chat = currentScript.getAttribute('data-hide-chat');
    }
    let cl2 = hlpt_getParentUrl();
    const wurl2 = 'https://auth.locationapi.co/resources2?d=' + cl2 + '&v=' + Date.now();
    $(document).ready(function () {
      $.getJSON(wurl2).done(function (a) {
        if (a.e && a.mce) {
          /* 1 */ window.__lc = window.__lc || {};
          window.__lc.license = 12322335;
          if (document.body.classList.contains('IsAdmin')) {
            window.__lc.group = 3;
          }
          (function (n, t, c) {
            function i(n) {
              return e._h ? e._h.apply(null, n) : e._q.push(n);
            }
            var e = {
              _q: [],
              _h: null,
              _v: '2.0',
              on: function () {
                i(['on', c.call(arguments)]);
              },
              once: function () {
                i(['once', c.call(arguments)]);
              },
              off: function () {
                i(['off', c.call(arguments)]);
              },
              get: function () {
                if (!e._h) throw new Error("[LiveChatWidget] You can't use getters before load.");
                return i(['get', c.call(arguments)]);
              },
              call: function () {
                i(['call', c.call(arguments)]);
              },
              init: function () {
                var n = t.createElement('script');
                (n.async = !0), (n.type = 'text/javascript'), (n.src = 'https://cdn.livechatinc.com/tracking.js'), t.head.appendChild(n);
              },
            };
            !n.__lc.asyncInit && e.init(), (n.LiveChatWidget = n.LiveChatWidget || e);
          })(window, document, [].slice);
          hlpt_offline_chat_msg();
          if (hide_chat == 'true' || widget_open_status == 'hide') {
            hlpt_hide_chat_widget();
          } else {
            hlpt_show_chat_widget();
          }
        }
      });
    });
  };

  const hlpt_hide_chat_widget = () => {
    var chat_container = document.querySelector('#chat-widget-container');
    if (!document.body.contains(chat_container)) {
      setTimeout(hlpt_hide_chat_widget, 250);
    } else {
      $('#chat-widget-container').hide();
    }
  };

  const hlpt_show_chat_widget = () => {
    var chat_container = document.querySelector('#chat-widget-container');
    if (!document.body.contains(chat_container)) {
      setTimeout(hlpt_show_chat_widget, 250);
    } else {
      $('#chat-widget-container').show();
    }
  };

  const handle_widget_icon_click = function (event) {
    if (window.is_dragging) {
      return false;
    }
    var widget_icon_id = '';
    if (window.wp == 'top') {
      widget_icon_id = 'helpDeskCtrlAdvTop';
    } else if (window.wp == 'bottom_left') {
      widget_icon_id = 'helpDeskCtrlAdvBL';
    } else if (window.wp == 'bottom_right') {
      widget_icon_id = 'helpDeskCtrlAdvBR';
    }

    var control_top = document.querySelector('#' + widget_icon_id);

    control_top.classList.toggle('widget_opened');
    if (control_top.classList.contains('widget_opened')) {
      document.querySelector('#advance_modal_support').classList.remove('force-hidden');
      add_widget_source("handle_widget_icon_click");
      open_modal_support();
    } else {
      if (document.body.contains(document.querySelector('#advance_modal_support'))) {
        document.querySelector('#advance_modal_support').style.display = 'none';
        //document.querySelector('#advance_modal_support').classList.add('force-hidden');
        do_force_hidden(document.querySelector('#advance_modal_support'), 'handle_widget_icon_click');
        remove_widget_source();
        document.body.classList.remove('expand_iframe');
        document.body.classList.remove('expand_iframe_from_right2left');
      }

      if (document.body.contains(document.querySelector('#chat-widget-container'))) {
        $('#chat-widget-container').hide();
      }
    }
  };

  const hlpt_help_widget_launcher_icon = function () {
    const hlmembership = document.querySelector('#user-library');
    const membership_login = document.querySelector('#login-brand-logo');
    const toggleUpClose = document.querySelector('.toggle-up-close');
    const toggleUpCloseDots = document.querySelectorAll('.dot');
    if (hlmembership && !document.body.classList.contains('memberships')) document.body.classList.add('memberships');
    if (window.data_app === 'gen' && !hlmembership && !membership_login) {
      if (toggleUpClose && toggleUpCloseDots.length > 0) {
        toggleUpClose.style.top = '-37px';
        toggleUpCloseDots.forEach((toggleUpCloseDot) => {
          toggleUpCloseDot.style.marginBottom = '0px';
        });
      }
    }
  };
  const hlpt_members_login_widget = function () {
    const membership_login = document.querySelector('#login-brand-logo');
    if (membership_login && !document.body.classList.contains('memlogin')) document.body.classList.add('memlogin');
  };
  function addAwesomeFontSheet(url) {
    if (!document.querySelector(`link[href="${url}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      document.head.appendChild(link);
    }
  }

  const mo_launcher_icon = function () {
    const targetNode = document.querySelector('body');
    const config = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver(function (mutations) {
      hlpt_help_widget_launcher_icon();
      // update_compactWidget_position();
      hlpt_members_login_widget();
    });
    observer.observe(targetNode, config);
  };

  const hlpt_help_widget_setup = function () {
    var widget_app = document.querySelector('#app');
    if (!document.body.contains(widget_app)) {
      setTimeout(hlpt_help_widget_setup, 250);
    } else {
      const targetNode = document.querySelector('#app');
      const config = { attributes: true, childList: true, subtree: true };
      const observer = new MutationObserver(function (mutations) {
        hlpt_advance_widget();
        //hlpt_classic_widget();
        hlpt_new_sidebar_widget();
        if (document.body.contains(document.querySelector('.ms_widget')) && document.querySelector('.ms_widget')) {
          document.querySelector('.ms_widget').addEventListener('click', handle_widget_icon_click, false);
        }
        /* if (document.body.contains(document.querySelector('.ms_classic')) && document.querySelector('.ms_classic')) {
          document.querySelector('.ms_classic').addEventListener('click', open_modal_support, false);
        } */

        if (document.body.contains(document.querySelector('.ms_widget_sb')) && document.querySelector('.ms_widget_sb')) {
          document.querySelector('.ms_widget_sb').addEventListener('click', handle_widget_icon_click, false);
        }
        /* if (document.body.contains(document.querySelector('.ms_classic_sb')) && document.querySelector('.ms_classic_sb')) {
          document.querySelector('.ms_classic_sb').addEventListener('click', open_modal_support, false);
        } */
      });
      observer.observe(targetNode, config);
    }
  };

  /*   * Chat Functions  */
  function hlpt_offline_chat_msg() {
    if (typeof LiveChatWidget !== 'undefined') {
      LiveChatWidget.on('ready', chat_widget_ready);
      LiveChatWidget.on('form_submitted', onFormSubmitted);
      LiveChatWidget.on('customer_status_changed', onCustomerStatusChanged);
    } else {
      setTimeout(hlpt_offline_chat_msg, 3000);
    }
  }

  function chat_widget_ready(initialData) {
    var state = initialData.state;
    var customerData = initialData.customerData;
    var current_state = 'online';
    if (typeof state !== 'undefined' && state.hasOwnProperty('availability')) current_state = state.availability;

    if (current_state == 'offline') {
      var chat_off_msg = document.getElementById('hlpt_chat_off_msg');
      if (!document.body.contains(chat_off_msg)) {
        const chat_msg_div = document.createElement('div');
        chat_msg_div.innerHTML = '<span>Live chat hours are 6 AM to 9 PM PST.</span>';
        chat_msg_div.setAttribute('id', 'hlpt_chat_off_msg');
        chat_msg_div.style.setProperty('position', 'fixed');
        chat_msg_div.style.setProperty('bottom', '10px');
        chat_msg_div.style.setProperty('right', '10px');
        chat_msg_div.style.setProperty('background-color', '#EEEEEE');
        chat_msg_div.style.setProperty('color', '#777777');
        chat_msg_div.style.setProperty('padding', '5px 15px');
        chat_msg_div.style.setProperty('font-size', '14px');
        document.body.appendChild(chat_msg_div);
      }
    }

    $('.ticketFormWrapper').remove();
    $('.ticketFormContent').remove();

    let url = window.location != window.parent.location ? document.referrer : document.location.href,
      agency_name = url.split('.')[1].toUpperCase();

    if ($('.ticketFormWrapper').length == 0) {
      let ticketFormWrapper = document.createElement('div');
      ticketFormWrapper.classList.add('ticketFormWrapper');
      $(ticketFormWrapper).css({
        display: 'flex',
        width: '270px',
        overflow: 'auto',
        position: 'absolute',
        top: '500px',
        right: '40px',
        'background-color': '#FFF',
        padding: '2% 2%',
        'border-radius': '5px',
        'box-shadow': 'rgb(0 0 0 / 10%) 0px 1px 2px',
      });
      ticketFormWrapper.innerHTML =
        '<div class="ticketCloseButton" style="position: absolute;padding: 2%;font-size: 12px;font-weight: bold;left: 93%;top: -7%;cursor: pointer;">X</div><div class="ticketFormButton" style="cursor:pointer;background-color: #000;color: #FFF;padding: 5%;border-radius: 5px;text-align: center;font-size: 14px;width: 96%;margin: auto;"><span>Create ticket</span></div>';
      if (current_state == 'online') {
        $('#chat-widget-container').append($(ticketFormWrapper));
      } else {
        $(ticketFormWrapper).css({ width: '275px', top: '715px', right: '10px', overflow: 'hidden' });
        $(ticketFormWrapper).insertAfter($('#hlpt_chat_off_msg'));
      }
    }

    $('.ticketFormButton').on('click', function () {
      $('.ticketFormWrapper').hide();

      $('.ticketFormContent').remove();

      if ($('.ticketFormContent').length == 0) {
        let ticketFormContent = document.createElement('div');
        ticketFormContent.classList.add('ticketFormContent');
        $(ticketFormContent).css({
          width: '270px',
          height: '465px',
          overflow: 'auto',
          position: 'absolute',
          top: '130px',
          right: '41px',
          'background-color': '#FFF',
          padding: '5%',
          'border-radius': '5px',
          'box-shadow': 'rgb(0 0 0 / 10%) 0px 1px 2px',
        });

        let ticketFormBlurb = document.createElement('div');
        ticketFormBlurb.classList.add('ticketFormBlurb');
        ticketFormBlurb.innerHTML = 'Please fill in the form below before creating your ticket.';
        $(ticketFormContent).append(ticketFormBlurb);

        let ticketFormBlurbBreak = document.createElement('br');
        $(ticketFormContent).append(ticketFormBlurbBreak);

        let ticketFormName = document.createElement('div');
        ticketFormName.classList.add('ticketFormName');
        ticketFormName.innerHTML =
          '<label for="ticketFormNameInput">Name: <span class="required" style="color: red;">*</span></label><br><input style="width:100%;" id="ticketFormNameInput" name="ticketFormNameInput"></input><br>';
        $(ticketFormContent).append(ticketFormName);

        let ticketFormEmail = document.createElement('div');
        ticketFormEmail.classList.add('ticketFormEmail');
        ticketFormEmail.innerHTML =
          '<label for="ticketFormEmailInput">Email: <span class="required" style="color: red;">*</span></label><br><input style="width:100%;" id="ticketFormEmailInput" name="ticketFormEmailInput"></input><br>';
        $(ticketFormContent).append(ticketFormEmail);

        let ticketFormQuestion = document.createElement('div');
        ticketFormQuestion.classList.add('ticketFormQuestion');
        ticketFormQuestion.innerHTML =
          '<label for="ticketFormQuestionInput">Question: <span class="required" style="color: red;">*</span></label><br><textarea style="width:100%;" id="ticketFormQuestionInput" name="ticketFormQuestionInput"></textarea><br>';
        $(ticketFormContent).append(ticketFormQuestion);

        let ticketFormLink = document.createElement('div');
        ticketFormLink.classList.add('ticketFormLink');
        ticketFormLink.innerHTML = '<label for="ticketFormLinkInput">Video/Screenshot Link: </label><br><input style="width:100%;" id="ticketFormLinkInput" name="ticketFormLinkInput"></input><br>';
        $(ticketFormContent).append(ticketFormLink);

        let ticketFormExtra = document.createElement('div');
        ticketFormExtra.classList.add('ticketFormExtra');
        ticketFormExtra.innerHTML =
          '<label for="ticketFormExtraInput">Extra details (please include any affected automations or sites): <span class="required">*</span></label><br><textarea style="width:100%;" id="ticketFormExtraInput" name="ticketFormExtraInput"></textarea><br>';
        $(ticketFormContent).append(ticketFormExtra);

        let ticketFormContentButton = document.createElement('div');
        ticketFormContentButton.classList.add('ticketFormContentButton');
        $(ticketFormContentButton).css({
          cursor: 'pointer',
          'background-color': '#000',
          color: '#FFF',
          padding: '5%',
          'border-radius': '5px',
          'text-align': 'center',
          'margin-top': '3%',
          'font-size': '14px',
        });
        ticketFormContentButton.innerHTML = '<span>Create ticket</span>';
        $(ticketFormContent).append(ticketFormContentButton);

        let ticketFormContentButtonLoader = document.createElement('div');
        ticketFormContentButtonLoader.classList.add('ticketFormContentButtonLoader');
        $(ticketFormContentButtonLoader).css({ display: 'none', 'font-size': '14px' });
        ticketFormContentButtonLoader.textContent = 'Sending...';
        $(ticketFormContent).append(ticketFormContentButtonLoader);

        let ticketFormButtonBreak = document.createElement('br');
        $(ticketFormContent).append(ticketFormButtonBreak);

        let ticketFormBack = document.createElement('div');
        ticketFormBack.classList.add('ticketFormBack');
        ticketFormBack.innerHTML = '<span style="text-decoration:underline;cursor:pointer;">Back to live chat</span>';
        $(ticketFormContent).append(ticketFormBack);

        if (current_state == 'online') {
          document.getElementById('chat-widget-container').appendChild(ticketFormContent);
        } else {
          $(ticketFormContent).css({ width: '275px', height: '575px', top: '235px', right: '0px' });
          $(ticketFormContent).insertAfter($('#hlpt_chat_off_msg'));
          $('.ticketFormBack').html('<span style="text-decoration:underline;cursor:pointer;">Close ticket window</span>');
        }

        $('.ticketFormBack').on('click', function () {
          $('.ticketFormContent').remove();
          $('.ticketFormWrapper').show();
        });

        $('.ticketFormContentButton').on('click', function () {
          if ($('#ticketFormNameInput').val() == '' || $('#ticketFormEmailInput').val() == '' || $('#ticketFormQuestionInput').val() == '') {
            alert('Some information is missing, please enter all required information.');
          } else {
            $(this).hide();
            $('.ticketFormContentButtonLoader').show();
            $.ajax({
              type: 'get',
              url: 'https://customizer.hlprotools.com/helpwise.php',
              data: {
                email: $('#ticketFormEmailInput').val(),
                name: $('#ticketFormNameInput').val(),
                question: $('#ticketFormQuestionInput').val(),
                link: $('#ticketFormLinkInput').val(),
                details: $('#ticketFormExtraInput').val(),
                agency: agency_name,
                domain: hlpt_getParentUrl(),
                url: url,
              },
              async: true,
              contentType: 'application/json',
              dataType: 'json',
              success: function (data) {
                if (data.success == '1') {
                  $('.ticketFormContent').empty();

                  let ticketFormSuccess = document.createElement('div');
                  ticketFormSuccess.classList.add('ticketFormSuccess');
                  ticketFormSuccess.innerHTML = '<span>Your ticket has been created. Thanks!</span>';
                  $(ticketFormContent).append(ticketFormSuccess);

                  let ticketFormBackSuccess = document.createElement('div');
                  ticketFormBackSuccess.classList.add('ticketFormBackSuccess');
                  ticketFormBackSuccess.innerHTML = '<span style="text-decoration:underline;cursor:pointer;">Back to live chat</span>';
                  $(ticketFormContent).append(ticketFormBackSuccess);

                  let ticketFormSuccessBreak = document.createElement('br');
                  $(ticketFormContent).append(ticketFormSuccessBreak);

                  if (current_state == 'offline') {
                    $('.ticketFormBackSuccess').html('<span style="text-decoration:underline;cursor:pointer;">Close ticket window</span>');
                  }

                  $('.ticketFormBackSuccess span').on('click', function () {
                    $('.ticketFormContent').remove();
                    $('.ticketFormWrapper').show();
                  });
                }
              },
            });
          }
        });
      }
    });

    $('.ticketCloseButton').on('click', function () {
      $('.ticketFormWrapper').remove();
      $('.ticketFormContent').remove();
    });
  }

  function onFormSubmitted(data) {
    switch (data.type) {
      case 'prechat':
        $('.ticketFormWrapper').hide();
        transferCall();
        transferExternalCall();
        break;

      case 'postchat':
        // postchat submitted
        break;

      case 'ticket':
        // ticket submitted
        break;

      default:
        break;
    }
  }

  function onCustomerStatusChanged(data) {
    switch (data.status) {
      case 'queued':
        // customer is in queue
        break;
      case 'chatting':
        // customer is currently chatting
        //addTag();
        break;
      case 'invited':
        // customer received an invitation but didn't start the chat
        break;
      case 'browsing':
        // customer is in idle state, not queued, not chatting, and didn't receive an invitation
        break;
    }
  }

  function transferCall() {
    setTimeout(function () {
      if (LiveChatWidget.get('chat_data').chatId != '') {
        var url = window.location != window.parent.location ? document.referrer : document.location.href;

        const hlpt_loadEmbed = (url, cb) => {
          var xmlhttp;
          xmlhttp = new XMLHttpRequest();
          xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
              cb(xmlhttp.responseText);
            }
          };
          xmlhttp.open('GET', url, true);
          xmlhttp.send();
        };

        hlpt_loadEmbed('https://auth.locationapi.co/resources2?d=' + url.split('/')[2] + '&ue=' + LiveChatWidget.get('customer_data').email + '&v=' + Date.now(), function (j) {
          let r = JSON.parse(j);
          if (r.c) {
            var data = `{
                          "id": "${LiveChatWidget.get('chat_data').chatId}",
                          "ignore_agents_availability": true,
                          "ignore_requester_presence": true,
                          "target": {
                            "type": "group",
                            "ids": [
                              3
                            ]
                          }
                        }`;

            $.ajax({
              url: 'https://api.livechatinc.com/v3.4/agent/action/transfer_chat',
              headers: {
                Authorization: 'Basic ' + btoa('f08a994e-73d6-4f24-bbb0-96e03bb92960' + ':' + 'dal:N_DovY3Tn0f2fJEp94iMdCV27vY'),
              },
              type: 'POST',
              dataType: 'json',
              contentType: 'application/json',
              data: data,
              success: function (data) {
                console.log('success');
              },
              error: function () {
                console.log('error');
              },
            });
          }
        });
      }
    }, 500);
  }

  function transferExternalCall() {
    setTimeout(function () {
      if (LiveChatWidget.get('chat_data').chatId != '') {
        var url = window.location != window.parent.location ? document.referrer : document.location.href,
          data = '',
          agency = '';

        if (url.includes('automatesales')) {
          data = `{
              "id": "${LiveChatWidget.get('chat_data').chatId}",
              "ignore_agents_availability": true,
              "ignore_requester_presence": true,
              "target": {
                "type": "group",
                "ids": [
                  4
                ]
              }
            }`;

          agency = 'AutomateSales';
        } else if (url.includes('eversuite')) {
          data = `{
            "id": "${LiveChatWidget.get('chat_data').chatId}",
            "ignore_agents_availability": true,
            "ignore_requester_presence": true,
            "target": {
              "type": "group",
              "ids": [
                5
              ]
            }
          }`;

          agency = 'Eversuite';
        } else if (url.includes('leaddragon')) {
          data = `{
            "id": "${LiveChatWidget.get('chat_data').chatId}",
            "ignore_agents_availability": true,
            "ignore_requester_presence": true,
            "target": {
              "type": "group",
              "ids": [
                6
              ]
            }
          }`;

          agency = 'LeadDragon';
        } else if (url.includes('golawhustle')) {
          data = `{
            "id": "${LiveChatWidget.get('chat_data').chatId}",
            "ignore_agents_availability": true,
            "ignore_requester_presence": true,
            "target": {
              "type": "group",
              "ids": [
                7
              ]
            }
          }`;

          agency = 'GoLawHustle';
        } else if (url.includes('leadwise')) {
          data = `{
            "id": "${LiveChatWidget.get('chat_data').chatId}",
            "ignore_agents_availability": true,
            "ignore_requester_presence": true,
            "target": {
              "type": "group",
              "ids": [
                8
              ]
            }
          }`;

          agency = 'Leadwise';
        } else if (url.includes('rainmakerai')) {
          data = `{
            "id": "${LiveChatWidget.get('chat_data').chatId}",
            "ignore_agents_availability": true,
            "ignore_requester_presence": true,
            "target": {
              "type": "group",
              "ids": [
                9
              ]
            }
          }`;

          agency = 'RainMakerAI';
        } else if (url.includes('leadmomentum')) {
          data = `{
            "id": "${LiveChatWidget.get('chat_data').chatId}",
            "ignore_agents_availability": true,
            "ignore_requester_presence": true,
            "target": {
              "type": "group",
              "ids": [
                10
              ]
            }
          }`;

          agency = 'LeadMomentum';
        }

        $.ajax({
          url: 'https://api.livechatinc.com/v3.4/agent/action/transfer_chat',
          headers: {
            Authorization: 'Basic ' + btoa('f08a994e-73d6-4f24-bbb0-96e03bb92960' + ':' + 'dal:N_DovY3Tn0f2fJEp94iMdCV27vY'),
          },
          type: 'POST',
          dataType: 'json',
          contentType: 'application/json',
          data: data,
          success: function (data) {
            console.log('success');
            const Http = new XMLHttpRequest();
            const url = 'https://customizer.hlprotools.com/zapierHook.php?name=' + LiveChatWidget.get('customer_data').name + '&agency=' + agency;
            Http.open('GET', url);
            Http.send();
          },
          error: function () {
            console.log('error');
          },
        });
      }
    }, 500);
  }

  function addTag() {
    var url = window.location != window.parent.location ? document.referrer : document.location.href,
      tagData = '';

    if (url.includes('automatesales')) {
      tagData = `{
          "chat_id": "${LiveChatWidget.get('chat_data').chatId}",
          "thread_id": "${LiveChatWidget.get('chat_data').threadId}",
          "tag": "Automate Sales"
        }`;
    } else if (url.includes('eversuite')) {
      tagData = `{
          "chat_id": "${LiveChatWidget.get('chat_data').chatId}",
          "thread_id": "${LiveChatWidget.get('chat_data').threadId}",
          "tag": "eversuite"
        }`;
    } else if (url.includes('leaddragon')) {
      tagData = `{
          "chat_id": "${LiveChatWidget.get('chat_data').chatId}",
          "thread_id": "${LiveChatWidget.get('chat_data').threadId}",
          "tag": "leaddragon"
        }`;
    } else if (url.includes('golawhustle')) {
      tagData = `{
          "chat_id": "${LiveChatWidget.get('chat_data').chatId}",
          "thread_id": "${LiveChatWidget.get('chat_data').threadId}",
          "tag": "GoLawHustle"
        }`;
    } else if (url.includes('leadwise')) {
      tagData = `{
          "chat_id": "${LiveChatWidget.get('chat_data').chatId}",
          "thread_id": "${LiveChatWidget.get('chat_data').threadId}",
          "tag": "leadwise.ai"
        }`;
    } else if (url.includes('rainmakerai')) {
      tagData = `{
          "chat_id": "${LiveChatWidget.get('chat_data').chatId}",
          "thread_id": "${LiveChatWidget.get('chat_data').threadId}",
          "tag": "RainMakerAI"
        }`;
    } else if (url.includes('leadmomentum')) {
      tagData = `{
          "chat_id": "${LiveChatWidget.get('chat_data').chatId}",
          "thread_id": "${LiveChatWidget.get('chat_data').threadId}",
          "tag": "leadmomentum"
        }`;
    }

    $.ajax({
      url: 'https://api.livechatinc.com/v3.4/agent/action/tag_thread',
      headers: {
        Authorization: 'Basic ' + btoa('f08a994e-73d6-4f24-bbb0-96e03bb92960' + ':' + 'dal:i1I_N35i61ce0xcEowMHY3zfcSY'),
      },
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: tagData,
      success: function (data) {
        console.log('success: added tags');
      },
      error: function () {
        console.log('error: tags');
      },
    });
  }
  //////////////////////

  const update_compactWidget_position = function () {
    if (window.is_dragging) {
      window.addEventListener(
        'message',
        function (event) {
          const elmnt = document.querySelector('#helpDeskCtrlAdvBR');
          const dragContainer = document.querySelector('.help-awidget-bottom-right-pos');
          const dragContainerdrag = document.querySelector('.help-awidget-bottom-right-posdrag');
          if (!dragContainer || !dragContainerdrag) {
            // console.error('elements not found');
            return;
          }

          const eventType = event.data.event;
          let dragButtonRect = elmnt.getBoundingClientRect();
          const isBottom = dragButtonRect.top > window.innerHeight * 0.5;
          const isRight = dragButtonRect.left > window.innerWidth * 0.5;
          const isTop = dragButtonRect.top <= window.innerHeight * 0.5;
          const isLeft = dragButtonRect.left <= window.innerWidth * 0.5;

          if (eventType === 'addCompactClass') {
            document.body.classList.remove('cw-br', 'cw-bl', 'cw-tr', 'cw-tl');
          } else if (eventType === 'removeCompactClass') {
            if (isBottom && isRight) {
              document.body.classList.add('cw-br');
            } else if (isBottom && isLeft) {
              document.body.classList.add('cw-bl');
            } else if (isTop && isRight) {
              document.body.classList.add('cw-tr');
            } else if (isTop && isLeft) {
              document.body.classList.add('cw-tl');
            }
          }
        },
        false
      );
    }
  };

  const update_advance_widget_position = function (leftpos, toppos) {
    const dragContainer = document.querySelector('.help-awidget-bottom-right-pos');
    const dragContainerdrag = document.querySelector('.help-awidget-bottom-right-posdrag');
    if (typeof dragContainerdrag !== 'undefined' && dragContainerdrag) {
      dragContainerdrag.style.left = leftpos;
      dragContainerdrag.style.top = toppos;
      dragContainerdrag.style.display = 'flex';

      window.positionleft = leftpos;
      window.positiontop = toppos;
    }
    if (typeof dragContainer !== 'undefined' && dragContainer) {
      dragContainer.style.left = leftpos;
      dragContainer.style.top = toppos;
    }
    update_compactWidget_position();
    return;
  };
  //////////////////////
  //// new added function for cp //
  function getQueryParam(url, paramName) {
    const paramRegex = new RegExp(`[?&]${paramName}=([^&]*)`);
    const match = url.match(paramRegex);
    return match && match[1] ? match[1] : null;
  }

  function updateQueryParam(url, paramName, paramValue) {
    const paramRegex = new RegExp(`([?&])${paramName}=.*?(&|$)`);
    const separator = url.includes('?') ? '&' : '?';

    if (url.match(paramRegex)) {
      url = url.replace(paramRegex, `$1${paramName}=${paramValue}$2`);
    } else {
      url += `${separator}${paramName}=${paramValue}`;
    }

    return url;
  }

  const modal_lid = function () {
    var tlid = '';
    var purl = document.location.href;
    var pua = purl.split('/');
    var location_pos = pua.indexOf('location');
    if (location_pos) {
      var tlid_pos = location_pos + 1;
      tlid = pua[tlid_pos];
    }
    return tlid;
  };

  const default_agency_logo = function () {
    const appElem = document.querySelector('#app');
    const custom_logo_img_elem = document.querySelector('.agency-logo-container img');
    const existing_clonelogo = document.querySelector('.cp-old-agency-logo');
    if (!custom_logo_img_elem || !appElem) {
      setTimeout(default_agency_logo, 250);
    } else {
      if (existing_clonelogo) {
        return existing_clonelogo.src;
      }
      let agency_logo_url = '';
      const duplicate_logo_elem = custom_logo_img_elem.cloneNode(true);
      duplicate_logo_elem.classList.add('cp-old-agency-logo');
      duplicate_logo_elem.style.setProperty('display', 'none', 'important');
      duplicate_logo_elem.style.setProperty('z-index', '-100', 'important');
      agency_logo_url = duplicate_logo_elem.src;
      document.body.appendChild(duplicate_logo_elem);
      return agency_logo_url;
    }
  };

  const setup_agency_modal_options = function (agsettings) {
    if (typeof agsettings === 'object') {
      if (agsettings.hasOwnProperty('as')) {
        var agsettings_as = agsettings.as;
        if (typeof agsettings_as === 'object') {
          if (agsettings_as.hasOwnProperty('awe')) {
            window.is_agency_widget_enabled = agsettings_as.awe;
          }
          if (agsettings_as.hasOwnProperty('ale')) {
            window.is_agency_lc_enabled = agsettings_as.ale;
          }
          if (agsettings_as.hasOwnProperty('aee')) {
            window.is_agency_email_enabled = agsettings_as.aee;
          }
          if (agsettings_as.hasOwnProperty('ape')) {
            window.is_agency_priority_enabled = agsettings_as.ape;
          }
        }
      }

      var agsettings_alct = 0;
      if (agsettings.hasOwnProperty('alct')) {
        agsettings_alct = agsettings.alct;
      }

      if (agsettings.hasOwnProperty('custom_logo')) {
        window.is_location_customlogo_enabled = true;
      }

      var pu = document.location.href;
      var hc = 0;
      var hct = 0;
      var qp = 0;
      var aqp = window.is_agency_priority_enabled;
      if (window.is_agency_widget_enabled) {
        var modal_support_frame = document.getElementById('modal_support_frame');
        let widgetElem = document.querySelector('.ms_widget');
        if (!(document.body.contains(modal_support_frame) && document.body.contains(widgetElem))) {
          let widgetPanel = document.querySelector('#advance_modal_support');
          if (typeof widgetPanel != 'undefined' && widgetPanel) {
            widgetPanel.style.setProperty('display', 'none', 'important');
            //widgetPanel.classList.add('force-hidden');
            do_force_hidden( widgetPanel, 'setup_agency_modal_options' );
            remove_widget_source();
          }
          setTimeout(function () {
            setup_agency_modal_options(agsettings);
          }, 250);
        } else {
          if (pu.includes('/location')) {
            var current_location_id = modal_lid();
            if (current_location_id) {
              //// working old
              let domain_plan = '';
              if (agsettings.hasOwnProperty('acp')) {
                var agsettings_acp = agsettings.acp;
                domain_plan = agsettings_acp;
              }

              if (agsettings.hasOwnProperty('lwe')) {
                var agsettings_lwe = agsettings.lwe;
                if (Array.isArray(agsettings_lwe) && agsettings_lwe.length) {
                  let widgetElem = document.querySelector('.ms_widget');
                  let sidebar_v2 = document.querySelector('#helpDeskCtrlNSW');
                  let widgetPanel = document.querySelector('#advance_modal_support');

                  if (agsettings_lwe.includes(current_location_id)) {
                    if (widgetElem) widgetElem.style.setProperty('display', 'none', 'important');
                    if (widgetPanel) {
                      widgetPanel.style.setProperty('display', 'none', 'important');
                      //widgetPanel.classList.add('force-hidden');
                      do_force_hidden(widgetPanel, 'setup_agency_modal_options 2');
                      remove_widget_source();
                      if (sidebar_v2) {
                        //sidebar_v2.classList.add('force-hidden');
                        do_force_hidden(sidebar_v2, 'setup_agency_modal_options 3');
                        remove_widget_source();
                        document.body.classList.add('sbv2');
                      }
                    }
                  } else {
                    if (widgetElem) widgetElem.style.setProperty('display', 'block', 'important');
                    if (widgetPanel) { 
                      //widgetPanel.classList.add('force-hidden'); 
                      //do_force_hidden(widgetPanel, 'setup_agency_modal_options 4'); 
                      //remove_widget_source(); 
                    }
                    if (sidebar_v2) {
                      sidebar_v2.classList.remove('force-hidden');
                      //add_widget_source("setup_agency_modal_options");
                      document.body.classList.remove('sbv2');
                    }
                  }
                } else {
                  if (agsettings_alct == 0) {
                  } else if (agsettings_alct > 0) {
                  }
                }
              }

              if (window.is_agency_lc_enabled) {
                if (domain_plan === 'vip') {
                  if (agsettings.hasOwnProperty('lle')) {
                    agsettings_lle = agsettings.lle;
                    if (Array.isArray(agsettings_lle) && agsettings_lle.length) {
                      if (agsettings_lle.includes(current_location_id)) {
                        document.body.classList.add('compact-widget--hct-1');
                      } else {
                        hct = 1;
                        if (agsettings_alct == 0) {
                        } else if (agsettings_alct > 0) {
                        }
                      }
                    } else {
                      hct = 1;
                      if (agsettings_alct == 0) {
                      } else if (agsettings_alct > 0) {
                      }
                    }
                  }
                } else {
                  if (agsettings.hasOwnProperty('lle')) {
                    var agsettings_lle = agsettings.lle;
                    if (Array.isArray(agsettings_lle) && agsettings_lle.length) {
                      if (agsettings_lle.includes(current_location_id)) {
                        hct = 1;
                        document.body.classList.add('compact-widget--hct-1');
                      }
                    } else {
                      if (agsettings_alct == 0) {
                      } else if (agsettings_alct > 0) {
                      }
                    }
                  }
                }
              } else {
                hct = 1;
              }

              if (window.is_agency_email_enabled) {
                if (domain_plan === 'vip') {
                  if (agsettings.hasOwnProperty('lee')) {
                    var agsettings_lee = agsettings.lee;
                    if (Array.isArray(agsettings_lee) && agsettings_lee.length) {
                      if (agsettings_lee.includes(current_location_id)) {
                        document.body.classList.add('compact-widget--hc-1');
                      } else {
                        hc = 1;
                        if (agsettings_alct == 0) {
                        } else if (agsettings_alct > 0) {
                        }
                      }
                    } else {
                      hc = 1;
                      if (agsettings_alct == 0) {
                      } else if (agsettings_alct > 0) {
                      }
                    }
                  }
                } else {
                  if (agsettings.hasOwnProperty('lee')) {
                    agsettings_lee = agsettings.lee;
                    if (Array.isArray(agsettings_lee) && agsettings_lee.length) {
                      if (agsettings_lee.includes(current_location_id)) {
                        hc = 1;
                        document.body.classList.add('compact-widget--hc-1');
                      }
                    } else {
                      if (agsettings_alct == 0) {
                      } else if (agsettings_alct > 0) {
                      }
                    }
                  }
                }
              } else {
                hc = 1;
              }
              if (agsettings.hasOwnProperty('lpe')) {
                var agsettings_lpe = agsettings.lpe;
                if (Array.isArray(agsettings_lpe) && agsettings_lpe.length) {
                  if (agsettings_lpe.includes(current_location_id)) {
                    qp = 1;
                    document.body.classList.add('compact-widget--qp-1');
                  } else {
                    qp = 0;
                  }
                }                  
              }

              //Update the value of aqp at the end
              aqp = window.is_agency_priority_enabled;
            }
          } else {
            window.is_agency_widget_enabled = 1;
            hc = 0;
            hct = 0;
            if (window.is_agency_email_enabled == 0) hc = 1;
            if (window.is_agency_lc_enabled == 0) hct = 1;
          }

          //var modal_support_frame_src = modal_support_frame.src;
          var modal_support_frame_src = modal_support_frame.getAttribute('data-src');
          // console.log('Org frame src: ', modal_support_frame_src);
          var current_hc = getQueryParam(modal_support_frame_src, 'hc');
          var current_hct = getQueryParam(modal_support_frame_src, 'hct');

          if (!(hct == current_hct && hc == current_hc)) {
            modal_support_frame_src = updateQueryParam(modal_support_frame_src, 'hc', hc);
            modal_support_frame_src = updateQueryParam(modal_support_frame_src, 'hct', hct);
            //modal_support_frame.src = modal_support_frame_src;
            modal_support_frame.setAttribute('data-src', modal_support_frame_src);
            }
          var current_qp = getQueryParam(modal_support_frame_src, 'qp');
          if (!(qp == current_qp)) {
            modal_support_frame_src = updateQueryParam(modal_support_frame_src, 'qp', qp);
            modal_support_frame.setAttribute('data-src', modal_support_frame_src);
          }

          var current_aqp = getQueryParam(modal_support_frame_src, 'aqp');
          if (!(aqp == current_aqp)) {
            modal_support_frame_src = updateQueryParam(modal_support_frame_src, 'aqp', aqp);
            modal_support_frame.setAttribute('data-src', modal_support_frame_src);
          }

          modal_support_frame_src = updateQueryParam(modal_support_frame_src, 'cf', '0');
          //modal_support_frame.src = modal_support_frame_src;
          modal_support_frame.setAttribute('data-src', modal_support_frame_src);
          // console.log('Updated frame src: ', modal_support_frame_src);
          // add_widget_source("setup_agency_modal_options");
        }
      }
    }
  };

  const setup_agency_guidedtour = function (agsettings) {
    var pu = document.location.href;
    if (pu.includes('/location')) {
      if (window.is_attribs_guided_tour_enabled) {
        if (typeof agsettings === 'object') {
          if (agsettings.hasOwnProperty('as')) {
            var agsettings_as = agsettings.as;
            if (typeof agsettings_as === 'object') {
              if (agsettings_as.hasOwnProperty('agt')) {
                window.is_agency_guided_tour_enabled = agsettings_as.agt;
              }
            }
          }
          let guided_tour_elem = document.getElementById('userflow-ui');
          if (!document.body.contains(guided_tour_elem)) {
            setTimeout(function () {
              setup_agency_guidedtour(agsettings);
            }, 250);
          } else {
            if (window.is_agency_guided_tour_enabled || window.is_attribs_guided_tour_enabled) {
              var current_location_id = modal_lid();
              if (current_location_id) {
                if (agsettings.hasOwnProperty('lgte')) {
                  agsettings_lgte = agsettings.lgte;
                  if (Array.isArray(agsettings_lgte) && agsettings_lgte.length) {
                    if (agsettings_lgte.includes(current_location_id)) {
                      document.body.classList.add('gt-hide');
                    } else {
                      document.body.classList.remove('gt-hide');
                    }
                  } else {
                    document.body.classList.remove('gt-hide');
                  }
                }
              }
            } else {
              document.body.classList.add('gt-hide');
            }
          }
        }
      }
    }
  };

  function location_custom_logo_style() {
    var e = document.createElement('style');
    e.appendChild(
      document.createTextNode('@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}.sidebar-v2-location #sidebar-v2 .agency-logo-container img{opacity:0;animation:fadeIn 0.5s ease-in-out 0.8s forwards}')
    ),
      document.head.appendChild(e);
  }

  const handle_agency_modal_location_change = function (agsettings) {
    let widget_app = document.querySelector('#app');
    if (!document.body.contains(widget_app)) {
      // setTimeout(handle_agency_modal_location_change, 250);
      setTimeout(function () {
        handle_agency_modal_location_change(agsettings);
      }, 250);
    } else {
      const targetNode = document.querySelector('#app');
      const config = { attributes: true };
      const observer = new MutationObserver(function (mutations) {
        setup_agency_modal_options(agsettings);
        // add_widget_source("setup_agency_modal_options");
        location_custom_logo_style();
        setup_agency_guidedtour(agsettings);
      });
      observer.observe(targetNode, config);
    }
  };
  // end of new added function for cp //
  const setup_dragable_widget_icon = function () {
    const dragContainer = document.querySelector('.help-awidget-bottom-right-posdrag');
    const dragablebutton = document.querySelector('#helpDeskCtrlAdvBR');
    const widgetIconArrowUpDn = document.querySelector('.closemetoggle');
    const cursorChange = document.querySelector('.widget-toggle');

    if (typeof dragablebutton != 'undefined' && dragablebutton) {
      if (!window.is_dragging) {
        document.body.classList.add('is-not-dragging');
      }
    }

    if (!document.body.contains(dragablebutton)) {
      setTimeout(setup_dragable_widget_icon, 250);
    } else {
      if (
        typeof dragablebutton !== 'undefined' &&
        dragablebutton &&
        typeof dragContainer !== 'undefined' &&
        dragContainer &&
        typeof widgetIconArrowUpDn !== 'undefined' &&
        widgetIconArrowUpDn &&
        typeof cursorChange !== 'undefined' &&
        cursorChange
      ) {
        dragElement(dragablebutton, dragContainer);
        function dragElement(elmnt, elemncon) {
          let pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
          if (document.querySelector(elmnt.id) && document.querySelector(elemncon.id)) {
            document.querySelector(elmnt.id).onmousedown = dragMouseDown;
            document.querySelector(elemncon.id).onmousedown = dragMouseDown;
          } else {
            elmnt.onmousedown = dragMouseDown;
            elemncon.onmousedown = dragMouseDown;
          }
          function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
          }
          function elementDrag(e) {
            const distance = Math.sqrt(Math.pow(e.clientX - pos3, 2) + Math.pow(e.clientY - pos4, 2));
            if (distance > 4) {
              window.is_dragging = true;
              window.is_rePositioned = true;
              document.body.classList.remove('is-not-dragging');
              cursorChange.style.cursor = 'move';
              widgetIconArrowUpDn.style.cursor = 'move';
              e = e || window.event;
              e.preventDefault();
              pos1 = pos3 - e.clientX;
              pos2 = pos4 - e.clientY;
              pos3 = e.clientX;
              pos4 = e.clientY;

              elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
              elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
              elemncon.style.top = elmnt.style.top;
              elemncon.style.left = elmnt.style.left;

              let offsetX = 20;
              let offsetY = 20;
              let initialContainerX = 30;
              let initialContainerY = 30;
              let containerX = e.clientX - offsetX;
              let containerY = e.clientY - offsetY;

              elemncon.style.left = containerX + 'px';
              elemncon.style.top = containerY + 'px';
              elmnt.style.left = containerX + 'px';
              elmnt.style.top = containerY + 'px';

              let finalContainerX = elemncon.offsetLeft;
              let finalContainerY = elemncon.offsetTop;
              let deltaX = finalContainerX - initialContainerX;
              let deltaY = finalContainerY - initialContainerY;

              elemncon.style.left = finalContainerX + deltaX + 'px';
              elemncon.style.top = finalContainerY + deltaY + 'px';

              let dragButtonRect = elmnt.getBoundingClientRect();
              let containerWidth = elemncon.offsetWidth;
              let containerHeight = elemncon.offsetHeight;

              if (document.body.classList.contains('compact-widget')) {
                if (dragButtonRect.left > window.innerWidth * 0.5) {
                  elemncon.style.left = finalContainerX - containerWidth - 70 + 'px';
                } else {
                  elemncon.style.left = finalContainerX + elmnt.offsetWidth - 0 + 'px';
                }
                if (dragButtonRect.top > window.innerHeight * 0.5) {
                  if (document.body.classList.contains('cw-links-1')) elemncon.style.top = finalContainerY - containerHeight + 190 + 'px';
                  if (document.body.classList.contains('cw-links-2')) elemncon.style.top = finalContainerY - containerHeight + 150 + 'px';
                  if (document.body.classList.contains('cw-links-3')) elemncon.style.top = finalContainerY - containerHeight + 100 + 'px';
                  if (document.body.classList.contains('cw-links-4')) elemncon.style.top = finalContainerY - containerHeight + 60 + 'px';
                  if (document.body.classList.contains('cw-links-5')) elemncon.style.top = finalContainerY - containerHeight + 10 + 'px';
                  if (document.body.classList.contains('cw-links-6')) elemncon.style.top = finalContainerY - containerHeight - 30 + 'px';
                  if (document.body.classList.contains('cw-links-7')) elemncon.style.top = finalContainerY - containerHeight - 70 + 'px';
                  if (document.body.classList.contains('cw-links-8')) elemncon.style.top = finalContainerY - containerHeight - 110 + 'px';
                  if (document.body.classList.contains('cw-links-9')) elemncon.style.top = finalContainerY - containerHeight - 150 + 'px';
                  if (document.body.classList.contains('cw-links-10')) elemncon.style.top = finalContainerY - containerHeight - 190 + 'px';
                  widgetIconArrowUpDn.style.rotate = '0deg';
                } else {
                  elemncon.style.top = finalContainerY + elmnt.offsetHeight + 40 + 'px';
                }
              } else {
                if (dragButtonRect.left > window.innerWidth * 0.5) {
                  elemncon.style.left = finalContainerX - containerWidth + 30 + 'px';
                } else {
                  elemncon.style.left = finalContainerX + elmnt.offsetWidth - 30 + 'px';
                }
                if (dragButtonRect.top > window.innerHeight * 0.5) {
                  elemncon.style.top = finalContainerY - containerHeight - 30 + 'px';
                  widgetIconArrowUpDn.style.rotate = '0deg';
                } else {
                  elemncon.style.top = finalContainerY + elmnt.offsetHeight + 30 + 'px';
                  widgetIconArrowUpDn.style.rotate = '180deg';
                }
              }
              offsetX = e.clientX - elmnt.offsetLeft;
              offsetY = e.clientY - elmnt.offsetTop;
              window.positiontop = elemncon.style.top;
              window.positionleft = elemncon.style.left;
              update_advance_widget_position(window.positionleft, window.positiontop);
            }
          }

          function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;

            setTimeout(function () {
              window.is_dragging = false;
            }, 20);
            cursorChange.style.cursor = 'pointer';
            widgetIconArrowUpDn.style.cursor = 'pointer';
            //e.preventDefault();
          }
          function remove_dragElement(elem) {
            document.querySelector(elem).addEventListener(
              'mousedown',
              function (e) {
                e.stopPropagation();
              },
              false
            );
          }
          remove_dragElement('.toggle-icon-new-chat');
        }
      }
    }
  };
  function handlePgChange(agsettings) {
    setup_agency_modal_options(agsettings);
    // console.log(`route change`);
  }
  //////////////////////
  function hlpt_advance_widget_close_button() {
    // console.log(`Widget type: ${window.wt}`);
    if (window.wt !== 'classic') {
      // console.log(`Widget type: ${window.wt}`);
      var closeButtonCreated = false;
      function createCloseButton() {
        var widget_icon_id = '';
        if (window.wp == 'top') {
          widget_icon_id = 'helpDeskCtrlAdvTop';
        } else if (window.wp == 'bottom_left') {
          widget_icon_id = 'helpDeskCtrlAdvBL';
        } else if (window.wp == 'bottom_right') {
          widget_icon_id = 'helpDeskCtrlAdvBR';
        }
        var control_top = document.querySelector('#' + widget_icon_id);
        var adv_widget_modalSupport = document.querySelector('#advance_modal_support');
        if (typeof adv_widget_modalSupport !== 'undefined' && adv_widget_modalSupport.style.display !== 'block' && !closeButtonCreated) {
          var closeButton = document.createElement('button');
          closeButton.className = 'close-adv-widget-x';
          closeButton.innerHTML = '<i class="fas fa-times" style="color: #ffffff"></i>';
          closeButton.addEventListener('click', function () {
            adv_widget_modalSupport.style.display = 'none';
            control_top.classList.toggle('widget_opened');
          });
          adv_widget_modalSupport.appendChild(closeButton);
          closeButtonCreated = true;
        }
      }
      function observeDOM() {
        var observer = new MutationObserver(function (mutationsList, observer) {
          for (var mutation of mutationsList) {
            if (mutation.type === 'childList') {
              createCloseButton();
            }
          }
        });
        var config = { childList: true, subtree: true };
        observer.observe(document.body, config);
      }
      createCloseButton();
      observeDOM();
    }
  }

  function update_location_logos() {
    var agsettings = window.agsettings;
    if (typeof agsettings === 'object' && agsettings.hasOwnProperty('custom_logo')) {
      window.is_location_customlogo_enabled = true;
    }

    if (window.is_location_customlogo_enabled) {
      if (agsettings.hasOwnProperty('custom_logo')) {
        const custom_logo = agsettings.custom_logo;

        var t = document.createElement('style');
        t.id = 'logostyle_css_ms';

        let allCssRules = '';

        for (const id in custom_logo) {
          if (custom_logo.hasOwnProperty(id)) {
            const imgUrl = custom_logo[id];
            const cssRule = `
                        .hlpt_loc_${id} .agency-logo-container,
                        div[class*="sidebar-v2-location.${id}"] .agency-logo-container { 
                            background-image: url('${imgUrl}');
                            background-size: contain;
                            background-repeat: no-repeat;
                            background-position: center;
                            margin-left: 12px;
                            margin-right: 12px;
                        }

                        .hlpt_loc_${id} .agency-logo-container img,
                        div[class*="sidebar-v2-location.${id}"] .agency-logo-container img { 
                            visibility: hidden;
                        }
                    `;
            allCssRules += cssRule;
          }
        }
        t.innerHTML = allCssRules;
        document.getElementsByTagName('head')[0].appendChild(t);
      }
    }
  }

  $.getJSON(wurl).done(function (a) {
    if (window.data_app == 'hl' && (a.e || a.p == 'lifetime')) {
      if (a.rk) {
        var ref_key2 = a.rk;
        window.cp_ark = ref_key2;
        hlpt_load_themegen(ref_key2);
        hlpt_load_controlpanel(ref_key2);
        hlpt_load_smart_custom_buttons(ref_key2);
        hlpt_load_apm(ref_key2);
        // hlpt_load_hl_menu_structure(ref_key2);
        hlpt_load_controlpanel_lp(ref_key2);
        hlpt_load_cptb(ref_key2);
        // hlpt_load_guidedtour(ref_key2);
      }
      hlpt_userflow(ufkey);
      is_userflow_attribs();
    }
    if (a.e && a.mid) {
      const mwurl = 'https://join.modalsupport.com/modal/widget?mid=' + a.mid + '&v=' + Date.now();
      $.getJSON(mwurl).done(function (mw) {
        //live url
        const cust_url = 'https://customizerapi.locationapi.co/agency?k=' + a.rk + '&v=' + Date.now();
        //dev url
        // const cust_url = 'https://customizerapi.locationapi.co/dev/agency?k=' + a.rk + '&v=' + Date.now();
        $.getJSON(cust_url).done(function (agsettings) {
          window.agsettings = agsettings;
          update_location_logos();
          default_agency_logo();
          setup_agency_modal_options(agsettings);
          if (window.data_app == 'hl') {
            is_userflow_attribs();
            hlpt_userflow(ufkey, agsettings);
            setup_agency_guidedtour(agsettings);
          }
          handle_agency_modal_location_change(agsettings);
          hlpt_members_login_widget();
          if (mw.wp) {
            window.wp = mw.wp;
          }
          if (mw.wi) {
            window.wi = mw.wi;
          }
          if (mw.egw) {
            window.egw = mw.egw;
          }
          if (mw.wt) {
            if (mw.wt == 'advance') {
              window.wt = 'classic';
            } else {
              window.wt = mw.wt;
            }
          }
          window.wt = 'advanced';
          if (mw.wc) {
            window.wc = mw.wc;
            document.head.insertAdjacentHTML('beforeend', `<style>:root{--primaryColor:` + window.wc + `;}</style>`);
          } else if (window.wc) {
            document.head.insertAdjacentHTML('beforeend', `<style>:root{--primaryColor:#000000;}</style>`);
          }
          if (mw.p) {
            window.p = mw.p;
          }
          window.mid = a.mid;
          window.lw = a.lw;
          open_modal_support('hide');
          hlpt_jq_cccss_ms();
          post_message_calls();
          hlpt_advance_widget();
          hlpt_advance_widget_close_button();
          setup_dragable_widget_icon();
          //hlpt_classic_widget();
          hlpt_new_sidebar_widget();
          hlpt_help_widget_setup();

          if (document.body.contains(document.querySelector('.ms_widget')) && document.querySelector('.ms_widget')) {
            document.querySelector('.ms_widget').addEventListener('click', handle_widget_icon_click, false);
          }
          hlpt_autoload_support();
          addAwesomeFontSheet('https://kit.fontawesome.com/5e5db45630.css');
          mo_launcher_icon();
          // Function to handle route changes
          $(function () {
            handlePgChange(agsettings);
            setInterval(function () {
              if (window.location.href !== handlePgChange.lastUrl) {
                handlePgChange.lastUrl = window.location.href;
                handlePgChange(agsettings);
              }
            }, 100);
          });

          $(window).on('hashchange', function (e) {
            handlePgChange(agsettings);
          });
        });
      });
    }
  });

  // console.log(`Widget Init... v1.08`);
  /// main widget script
})();
