/*!
 * FilePondPluginImageEdit 1.6.3
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */

/* eslint-disable */

!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e = e || self).FilePondPluginImageEdit = t());
})(this, function () {
  "use strict";
  var e = function (e) {
      return /^image/.test(e.type);
    },
    t = function (t) {
      var i = t.addFilter,
        n = t.utils,
        o = t.views,
        r = n.Type,
        a = n.createRoute,
        l = n.createItemAPI,
        d =
          void 0 === l
            ? function (e) {
                return e;
              }
            : l,
        E = o.fileActionButton;
      i("SHOULD_REMOVE_ON_REVERT", function (t, i) {
        var n = i.item,
          o = i.query;
        return new Promise(function (t) {
          var i = n.file;
          t(
            !(
              o("GET_ALLOW_IMAGE_EDIT") &&
              o("GET_IMAGE_EDIT_ALLOW_EDIT") &&
              e(i)
            )
          );
        });
      }),
        i("DID_LOAD_ITEM", function (t, i) {
          var n = i.query,
            o = i.dispatch;
          return new Promise(function (i, r) {
            if (t.origin > 1) i(t);
            else {
              var a = t.file;
              if (n("GET_ALLOW_IMAGE_EDIT") && n("GET_IMAGE_EDIT_INSTANT_EDIT"))
                if (e(a)) {
                  var l = function (e, t, i) {
                      return function (n) {
                        c.shift(), n ? t(e) : i(e), o("KICK"), d();
                      };
                    },
                    d = function () {
                      if (c.length) {
                        var e = c[0],
                          t = e.item,
                          i = e.resolve,
                          n = e.reject;
                        o("EDIT_ITEM", {
                          id: t.id,
                          handleEditorResponse: l(t, i, n),
                        });
                      }
                    };
                  u({ item: t, resolve: i, reject: r }), 1 === c.length && d();
                } else i(t);
              else i(t);
            }
          });
        }),
        i("DID_CREATE_ITEM", function (e, t) {
          t.query;
          var i = t.dispatch;
          e.extend("edit", function () {
            i("EDIT_ITEM", { id: e.id });
          });
        });
      var c = [],
        u = function (e) {
          return c.push(e), e;
        };
      return (
        i("CREATE_VIEW", function (t) {
          var i = t.is,
            n = t.view,
            o = t.query;
          if (o("GET_ALLOW_IMAGE_EDIT")) {
            var r = o("GET_ALLOW_IMAGE_PREVIEW");
            if ((i("file-info") && !r) || (i("file") && r)) {
              var l = o("GET_IMAGE_EDIT_EDITOR");
              if (l) {
                l.filepondCallbackBridge ||
                  ((l.outputData = !0),
                  (l.outputFile = !1),
                  (l.filepondCallbackBridge = {
                    onconfirm: l.onconfirm || function () {},
                    oncancel: l.oncancel || function () {},
                  }));
                n.registerDestroyer(function (e) {
                  var t = e.root;
                  t.ref.buttonEditItem &&
                    t.ref.buttonEditItem.off("click", t.ref.handleEdit),
                    t.ref.editButton &&
                      t.ref.editButton.removeEventListener(
                        "click",
                        t.ref.handleEdit
                      );
                });
                var c = {
                  EDIT_ITEM: function (e) {
                    var t = e.root,
                      i = e.props,
                      n = e.action,
                      o = i.id,
                      r = n.handleEditorResponse;
                    (l.cropAspectRatio =
                      t.query("GET_IMAGE_CROP_ASPECT_RATIO") ||
                      l.cropAspectRatio),
                      (l.outputCanvasBackgroundColor =
                        t.query(
                          "GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR"
                        ) || l.outputCanvasBackgroundColor);
                    var a = t.query("GET_ITEM", o);
                    if (a) {
                      var E = a.file,
                        c = a.getMetadata("crop"),
                        u = a.getMetadata("resize"),
                        f = a.getMetadata("filter") || null,
                        s = a.getMetadata("filters") || null,
                        I = a.getMetadata("colors") || null,
                        _ = a.getMetadata("markup") || null,
                        T = {
                          crop: c || {
                            center: { x: 0.5, y: 0.5 },
                            flip: { horizontal: !1, vertical: !1 },
                            zoom: 1,
                            rotation: 0,
                            aspectRatio: null,
                          },
                          size: u
                            ? {
                                upscale: u.upscale,
                                mode: u.mode,
                                width: u.size.width,
                                height: u.size.height,
                              }
                            : null,
                          filter: s
                            ? s.id || s.matrix
                            : t.query("GET_ALLOW_IMAGE_FILTER") &&
                              t.query("GET_IMAGE_FILTER_COLOR_MATRIX") &&
                              !I
                            ? f
                            : null,
                          color: I,
                          markup: _,
                        };
                      (l.onconfirm = function (e) {
                        var t = e.data,
                          i = t.crop,
                          n = t.size,
                          o = t.filter,
                          E = t.color,
                          c = t.colorMatrix,
                          u = t.markup,
                          f = {};
                        if ((i && (f.crop = i), n)) {
                          var s = (a.getMetadata("resize") || {}).size,
                            I = { width: n.width, height: n.height };
                          (I.width && I.height) ||
                            !s ||
                            ((I.width = s.width), (I.height = s.height)),
                            (I.width || I.height) &&
                              (f.resize = {
                                upscale: n.upscale,
                                mode: n.mode,
                                size: I,
                              });
                        }
                        u && (f.markup = u),
                          (f.colors = E),
                          (f.filters = o),
                          (f.filter = c),
                          a.setMetadata(f),
                          l.filepondCallbackBridge.onconfirm(t, d(a)),
                          r &&
                            (l.onclose = function () {
                              r(!0), (l.onclose = null);
                            });
                      }),
                        (l.oncancel = function () {
                          l.filepondCallbackBridge.oncancel(d(a)),
                            r &&
                              (l.onclose = function () {
                                r(!1), (l.onclose = null);
                              });
                        }),
                        l.open(E, T);
                    }
                  },
                  DID_LOAD_ITEM: function (t) {
                    var i = t.root,
                      a = t.props;
                    if (o("GET_IMAGE_EDIT_ALLOW_EDIT")) {
                      var l = a.id,
                        d = o("GET_ITEM", l);
                      if (d) {
                        var c = d.file;
                        if (e(c))
                          if (
                            ((i.ref.handleEdit = function (e) {
                              e.stopPropagation(),
                                i.dispatch("EDIT_ITEM", { id: l });
                            }),
                            r)
                          ) {
                            var u = n.createChildView(E, {
                              label: "edit",
                              icon: o("GET_IMAGE_EDIT_ICON_EDIT"),
                              opacity: 0,
                            });
                            u.element.classList.add(
                              "filepond--action-edit-item"
                            ),
                              (u.element.dataset.align = o(
                                "GET_STYLE_IMAGE_EDIT_BUTTON_EDIT_ITEM_POSITION"
                              )),
                              u.on("click", i.ref.handleEdit),
                              (i.ref.buttonEditItem = n.appendChildView(u));
                          } else {
                            var f = n.element.querySelector(
                                ".filepond--file-info-main"
                              ),
                              s = document.createElement("button");
                            (s.className = "filepond--action-edit-item-alt"),
                              (s.innerHTML =
                                o("GET_IMAGE_EDIT_ICON_EDIT") +
                                "<span>edit</span>"),
                              s.addEventListener("click", i.ref.handleEdit),
                              f.appendChild(s),
                              (i.ref.editButton = s);
                          }
                      }
                    }
                  },
                };
                if (r) {
                  c.DID_IMAGE_PREVIEW_SHOW = function (e) {
                    var t = e.root;
                    t.ref.buttonEditItem && (t.ref.buttonEditItem.opacity = 1);
                  };
                }
                n.registerWriter(a(c));
              }
            }
          }
        }),
        {
          options: {
            allowImageEdit: [!0, r.BOOLEAN],
            styleImageEditButtonEditItemPosition: ["bottom center", r.STRING],
            imageEditInstantEdit: [!1, r.BOOLEAN],
            imageEditAllowEdit: [!0, r.BOOLEAN],
            imageEditIconEdit: [
              '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M8.5 17h1.586l7-7L15.5 8.414l-7 7V17zm-1.707-2.707l8-8a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-8 8A1 1 0 0 1 10.5 19h-3a1 1 0 0 1-1-1v-3a1 1 0 0 1 .293-.707z" fill="currentColor" fill-rule="nonzero"/></svg>',
              r.STRING,
            ],
            imageEditEditor: [null, r.OBJECT],
          },
        }
      );
    };
  return (
    "undefined" != typeof window &&
      void 0 !== window.document &&
      document.dispatchEvent(
        new CustomEvent("FilePond:pluginloaded", { detail: t })
      ),
    t
  );
});
