(function() {
    var pluginName = "jqueryAccordionMenu";
    var defaults = {
        speed: 300,
        showDelay: 0,
        hideDelay: 0,
        singleOpen: true,
        clickEffect: true
    };
    function Plugin(element, selector) {
        this.element = element;
        this.selector = selector;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    };
    $.extend(Plugin.prototype, {
        init: function() {
            this.openSubmenu();
            this.submenuIndicators();
            if (defaults.clickEffect) {
                this.addClickEffect()
            }
            this.addFootMoveAnimation();
            this.addBarMoveAnimation();
        },
        openSubmenu: function() {
            $(this.element).children("ul").find("li").bind("click touchstart",
            function(e) {
                e.stopPropagation();
                e.preventDefault();
                if ($(this).children(".submenu").length > 0) {
                    if ($(this).children(".submenu").css("display") == "none") {
                        $(this).children(".submenu").delay(defaults.showDelay).slideDown(defaults.speed);
                        $(this).children(".submenu").siblings("a").addClass("submenu-indicator-minus");
                        if (defaults.singleOpen) {
                            $(this).siblings().children(".submenu").slideUp(defaults.speed);
                            $(this).siblings().children(".submenu").siblings("a").removeClass("submenu-indicator-minus")
                        }
                        return false
                    } else {
                        $(this).children(".submenu").delay(defaults.hideDelay).slideUp(defaults.speed)
                    }
                    if ($(this).children(".submenu").siblings("a").hasClass("submenu-indicator-minus")) {
                        $(this).children(".submenu").siblings("a").removeClass("submenu-indicator-minus")
                    }
                }
                //window.location.href = $(this).children("a").attr("href")
            })
        },
        submenuIndicators: function() {
            if ($(this.element).find(".submenu").length > 0) {
                $(this.element).find(".submenu").siblings("a").append("<span class='submenu-indicator'>+</span>")
            }
        },
        addClickEffect: function() {
            var ink, d, x, y;
            $(this.element).find("a").bind("click touchstart",
            function(e) {
                $(".ink").remove();
                if ($(this).children(".ink").length === 0) {
                    $(this).prepend("<span class='ink'></span>")
                }
                ink = $(this).find(".ink");
                ink.removeClass("animate-ink");
                if (!ink.height() && !ink.width()) {
                    d = Math.max($(this).outerWidth(), $(this).outerHeight());
                    ink.css({
                        height: d,
                        width: d
                    })
                }
                x = e.pageX - $(this).offset().left - ink.width() / 2;
                y = e.pageY - $(this).offset().top - ink.height() / 2;
                ink.css({
                    top: y + 'px',
                    left: x + 'px'
                }).addClass("animate-ink")
            })
        },
        addFootMoveAnimation: function () {
            var footList = $(this.element).find(".jquery-accordion-menu-footer");
            if(footList.length === 0) {
                return;
            }
            var foot = footList[0];
            var menu = this.element;
            $(foot).bind("click", function () {
                if($(menu).hasClass("left")) {

                } else {

                }
            });
        },
        addBarMoveAnimation: function () {
            var barList = $(this.element).find(".bar");
            if(barList.length === 0) {
                return;
            }
            var bar = barList[0];
            var menu = this.selector;
            $(bar).bind("click", function () {
                if(! $(menu).hasClass("menu-move-right")) {
                    $(menu).css({ left: -260 + 'px'} );
                    $(menu).removeClass("menu-move-left").addClass("menu-move-right");
                } else {
                    $(menu).css({ left: 0 + 'px'} );
                    $(menu).removeClass("menu-move-right").addClass("menu-move-left");
                }

            });
        }
    });
    $.fn[pluginName] = function(selector) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, selector))
            }
        });
        return this
    }
})();