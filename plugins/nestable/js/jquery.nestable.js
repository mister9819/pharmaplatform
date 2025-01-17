! function(t, e, s, i) {
    var abc = "hey";
    var a = "ontouchstart" in s,
        o = function() {
            var t = s.createElement("div"),
                i = s.documentElement;
            if (!("pointerEvents" in t.style)) return !1;
            t.style.pointerEvents = "auto", t.style.pointerEvents = "x", i.appendChild(t);
            var a = e.getComputedStyle && "auto" === e.getComputedStyle(t, "").pointerEvents;
            return i.removeChild(t), !!a
        }(),
        l = {
            listNodeName: "ol",
            itemNodeName: "li",
            rootClass: "dd",
            listClass: "dd-list",
            itemClass: "dd-item",
            dragClass: "dd-dragel",
            handleClass: "dd-handle",
            collapsedClass: "dd-collapsed",
            placeClass: "dd-placeholder",
            noDragClass: "dd-nodrag",
            emptyClass: "dd-empty",
            expandBtnHTML: '<button data-action="expand" type="button">Expand</button>',
            collapseBtnHTML: '<button data-action="collapse" type="button">Collapse</button>',
            group: 0,
            maxDepth: 5,
            threshold: 20
        };

    function n(e, i) {
        this.w = t(s), this.el = t(e), this.options = t.extend({}, l, i), this.init()
    }
    n.prototype = {
        init: function() {
            var s = this;
            s.reset(), s.el.data("nestable-group", this.options.group), s.placeEl = t('<div class="' + s.options.placeClass + '"/>'), t.each(this.el.find(s.options.itemNodeName), function(e, i) {
                s.setParent(t(i));
            abc = t(i).parent().parent().attr("data-id");
            if (typeof abc !== "undefined") {
                abc = "gradient-" + abc;
            }
            }), s.el.on("click", "button", function(e) {
                if (!s.dragEl) {
                    var i = t(e.currentTarget),
                        a = i.data("action"),
                        o = i.parent(s.options.itemNodeName);
                    "collapse" === a && s.collapseItem(o), "expand" === a && s.expandItem(o)
                }
            });
            var i = function(e) {
                    var i = t(e.target);
                    if (!i.hasClass(s.options.handleClass)) {
                        if (i.closest("." + s.options.noDragClass).length) return;
                        i = i.closest("." + s.options.handleClass)
                    }
                    i.length && !s.dragEl && (s.isTouch = /^touch/.test(e.type), s.isTouch && 1 !== e.touches.length || (e.preventDefault(), s.dragStart(e.touches ? e.touches[0] : e)))
                },
                o = function(t) {
                    s.dragEl && (t.preventDefault(), s.dragMove(t.touches ? t.touches[0] : t))
                },
                l = function(t) {
                    s.dragEl && (t.preventDefault(), s.dragStop(t.touches ? t.touches[0] : t))
                };
            a && (s.el[0].addEventListener("touchstart", i, !1), e.addEventListener("touchmove", o, !1), e.addEventListener("touchend", l, !1), e.addEventListener("touchcancel", l, !1)), s.el.on("mousedown", i), s.w.on("mousemove", o), s.w.on("mouseup", l)
        },
        serialize: function() {
            var e = this;
            return step = function(s, i) {
                var a = [];
                return s.children(e.options.itemNodeName).each(function() {
                    var s = t(this),
                        o = t.extend({}, s.data()),
                        l = s.children(e.options.listNodeName);
                    l.length && (o.children = step(l, i + 1)), a.push(o)
                }), a
            }, step(e.el.find(e.options.listNodeName).first(), 0)
        },
        serialise: function() {
            return this.serialize()
        },
        reset: function() {
            this.mouse = {
                offsetX: 0,
                offsetY: 0,
                startX: 0,
                startY: 0,
                lastX: 0,
                lastY: 0,
                nowX: 0,
                nowY: 0,
                distX: 0,
                distY: 0,
                dirAx: 0,
                dirX: 0,
                dirY: 0,
                lastDirX: 0,
                lastDirY: 0,
                distAxX: 0,
                distAxY: 0
            }, this.isTouch = !1, this.moving = !1, this.dragEl = null, this.dragRootEl = null, this.dragDepth = 0, this.hasNewRoot = !1, this.pointEl = null
        },
        expandItem: function(t) {
            t.removeClass(this.options.collapsedClass), t.children('[data-action="expand"]').hide(), t.children('[data-action="collapse"]').show(), t.children(this.options.listNodeName).show();
            //t.find("h4").css({"color": "black"});
            //t.find("button").css({"color": "black"});
            //t.parent().parent().parent().parent().parent().parent().toggleClass(abc);
        },
        collapseItem: function(t) {
            t.children(this.options.listNodeName).length && (t.addClass(this.options.collapsedClass), t.children('[data-action="collapse"]').hide(), t.children('[data-action="expand"]').show(), t.children(this.options.listNodeName).hide());
            //t.find("h4").css({"color": "white"});
            //t.find("button").css({"color": "white"});
            //t.parent().parent().parent().parent().parent().parent().toggleClass(abc);
        },
        expandAll: function() {
            var e = this;
            e.el.find(e.options.itemNodeName).each(function() {
                e.expandItem(t(this))
            })
        },
        collapseAll: function() {
            var e = this;
            e.el.find(e.options.itemNodeName).each(function() {
                e.collapseItem(t(this))
            })
        },
        setParent: function(e) {
            e.children(this.options.listNodeName).length && (e.prepend(t(this.options.expandBtnHTML)), e.prepend(t(this.options.collapseBtnHTML))), e.children('[data-action="expand"]').hide()
        },
        unsetParent: function(t) {
            t.removeClass(this.options.collapsedClass), t.children("[data-action]").remove(), t.children(this.options.listNodeName).remove()
        },
        dragStart: function(e) {
            var a = this.mouse,
                o = t(e.target),
                l = o.closest(this.options.itemNodeName);
            this.placeEl.css("height", l.height()), a.offsetX = e.offsetX !== i ? e.offsetX : e.pageX - o.offset().left, a.offsetY = e.offsetY !== i ? e.offsetY : e.pageY - o.offset().top, a.startX = a.lastX = e.pageX, a.startY = a.lastY = e.pageY, this.dragRootEl = this.el, this.dragEl = t(s.createElement(this.options.listNodeName)).addClass(this.options.listClass + " " + this.options.dragClass), this.dragEl.css("width", l.width()), l.after(this.placeEl), l[0].parentNode.removeChild(l[0]), l.appendTo(this.dragEl), t(s.body).append(this.dragEl), this.dragEl.css({
                left: e.pageX - a.offsetX,
                top: e.pageY - a.offsetY
            });
            var n, d, h = this.dragEl.find(this.options.itemNodeName);
            for (n = 0; n < h.length; n++)(d = t(h[n]).parents(this.options.listNodeName).length) > this.dragDepth && (this.dragDepth = d)
        },
        dragStop: function(t) {
            var e = this.dragEl.children(this.options.itemNodeName).first();
            e[0].parentNode.removeChild(e[0]), this.placeEl.replaceWith(e), this.dragEl.remove(), this.el.trigger("change"), this.hasNewRoot && this.dragRootEl.trigger("change"), this.reset()
        },
        dragMove: function(i) {
            var a, l, n, d = this.options,
                h = this.mouse;
            this.dragEl.css({
                left: i.pageX - h.offsetX,
                top: i.pageY - h.offsetY
            }), h.lastX = h.nowX, h.lastY = h.nowY, h.nowX = i.pageX, h.nowY = i.pageY, h.distX = h.nowX - h.lastX, h.distY = h.nowY - h.lastY, h.lastDirX = h.dirX, h.lastDirY = h.dirY, h.dirX = 0 === h.distX ? 0 : h.distX > 0 ? 1 : -1, h.dirY = 0 === h.distY ? 0 : h.distY > 0 ? 1 : -1;
            var r = Math.abs(h.distX) > Math.abs(h.distY) ? 1 : 0;
            if (!h.moving) return h.dirAx = r, void(h.moving = !0);
            h.dirAx !== r ? (h.distAxX = 0, h.distAxY = 0) : (h.distAxX += Math.abs(h.distX), 0 !== h.dirX && h.dirX !== h.lastDirX && (h.distAxX = 0), h.distAxY += Math.abs(h.distY), 0 !== h.dirY && h.dirY !== h.lastDirY && (h.distAxY = 0)), h.dirAx = r, h.dirAx && h.distAxX >= d.threshold && (h.distAxX = 0, n = this.placeEl.prev(d.itemNodeName), h.distX > 0 && n.length && !n.hasClass(d.collapsedClass) && (a = n.find(d.listNodeName).last(), this.placeEl.parents(d.listNodeName).length + this.dragDepth <= d.maxDepth && (a.length ? (a = n.children(d.listNodeName).last()).append(this.placeEl) : ((a = t("<" + d.listNodeName + "/>").addClass(d.listClass)).append(this.placeEl), n.append(a), this.setParent(n)))), h.distX < 0 && (this.placeEl.next(d.itemNodeName).length || (l = this.placeEl.parent(), this.placeEl.closest(d.itemNodeName).after(this.placeEl), l.children().length || this.unsetParent(l.parent()))));
            var p = !1;
            if (o || (this.dragEl[0].style.visibility = "hidden"), this.pointEl = t(s.elementFromPoint(i.pageX - s.body.scrollLeft, i.pageY - (e.pageYOffset || s.documentElement.scrollTop))), o || (this.dragEl[0].style.visibility = "visible"), this.pointEl.hasClass(d.handleClass) && (this.pointEl = this.pointEl.parent(d.itemNodeName)), this.pointEl.hasClass(d.emptyClass)) p = !0;
            else if (!this.pointEl.length || !this.pointEl.hasClass(d.itemClass)) return;
            var c = this.pointEl.closest("." + d.rootClass),
                g = this.dragRootEl.data("nestable-id") !== c.data("nestable-id");
            if (!h.dirAx || g || p) {
                if (g && d.group !== c.data("nestable-group")) return;
                if (this.dragDepth - 1 + this.pointEl.parents(d.listNodeName).length > d.maxDepth) return;
                var f = i.pageY < this.pointEl.offset().top + this.pointEl.height() / 2;
                l = this.placeEl.parent(), p ? ((a = t(s.createElement(d.listNodeName)).addClass(d.listClass)).append(this.placeEl), this.pointEl.replaceWith(a)) : f ? this.pointEl.before(this.placeEl) : this.pointEl.after(this.placeEl), l.children().length || this.unsetParent(l.parent()), this.dragRootEl.find(d.itemNodeName).length || this.dragRootEl.append('<div class="' + d.emptyClass + '"/>'), g && (this.dragRootEl = c, this.hasNewRoot = this.el[0] !== this.dragRootEl[0])
            }
        }
    }, t.fn.nestable = function(e) {
        var s = this;
        return this.each(function() {
            var i = t(this).data("nestable");
            i ? "string" == typeof e && "function" == typeof i[e] && (s = i[e]()) : (t(this).data("nestable", new n(this, e)), t(this).data("nestable-id", (new Date).getTime()))
        }), s || this
    }
}(window.jQuery || window.Zepto, window, document);