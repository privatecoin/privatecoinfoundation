$(function() {
    $(document).ready(function(){

    $('.md-logo a').click( function() { $('#home').click(); return false; } );
		/* SECTION SLIDE
		---------------------------------------------------------*/
		$('#md-sections').ulslide({
			effect: {
				type: 'slide', // slide or fade
				axis: 'y',     // x, y
				distance: 0   // Distance between frames
			},
			duration: 500,
			autoslide: false,
			height: 'auto',
			width: '100%',
			mousewheel: true,
			direction: 'f',
			nextButton: '#arrow-next',
			prevButton: '#arrow-prev',
			pager: "#md-pager .md-page"
		});

        /* VALIDATE SUBSCRIBE FORM
        ---------------------------------------------------------*/
        if($("#md-subscribe-form").length > 0) {
            // Validate the contact form
            $('#md-subscribe-form').validate({
                // Add requirements to each of the fields
                rules: {
                    email: {
                        required: true,
                        email: true
                    }
                },

                // Specify what error messages to display
                // when the user does something horrid
                messages: {
                    email: {
                        required: "Please enter your email.",
                        email: "Please enter a valid email."
                    }
                },

                // Use Ajax to send everything to processForm.php
                submitHandler: function(form) {
                    $(form).ajaxSubmit({
                        success: function(responseText, statusText, xhr, $form) {
                            $("#notify-content").slideUp(600, function() {
                                $("#notify-content").html(responseText).slideDown(600);
                            });
                        }
                    });
                    return false;
                }
            });
        }

        /* VALIDATE MESSAGE FORM
        ---------------------------------------------------------*/
        if($("#md-message-form").length > 0) {
            // Validate the contact form
            $('#md-message-form').validate({
                // Add requirements to each of the fields
                rules: {
                    name: {
                        required: true,
                        minlength: 2
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    message: {
                        required: true,
                        minlength: 10
                    }
                },

                // Specify what error messages to display
                // when the user does something horrid
                messages: {
                    name: {
                        required: "Please enter your name.",
                        minlength: $.format("At least {0} characters required.")
                    },
                    email: {
                        required: "Please enter your email.",
                        email: "Please enter a valid email."
                    },
                    message: {
                        required: "Please enter a message.",
                        minlength: $.format("At least {0} characters required.")
                    }
                },

                // Use Ajax to send everything to processForm.php
                submitHandler: function(form) {
                    $(form).ajaxSubmit({
                        success: function(responseText, statusText, xhr, $form) {
                            $("#message-content").slideUp(600, function() {
                                $("#message-content").html(responseText).slideDown(600);
                            });
                        }
                    });
                    return false;
                }
            });
        }

        /* RESIZE FUNCTION
        ---------------------------------------------------------*/
        function pageResize() {
            var panelHeight = $(window).height(),
                panelWidth = $(window).width();
            $("#md-comingsoon, #md-sections").height(panelHeight);
            // Center md-content
            $('.md-content').each(function(){
                var _parent = $(this).parent(),
                    _self = $(this);
                _parent.show();
                mtop = (_parent.height() - _self.height() - 20)/2;
                if (mtop > 0)
                    _self.css({'margin-top': mtop})
                else
                    _self.css({'margin-top': 0})
            });

            if($mdBgImage.size() > 0) {
                var width = parseInt($mdBgImage.data("defW")),
                    height = parseInt($mdBgImage.data("defH"));
                if(height > 0 && panelHeight > 0) {
                    if (((width / height) > (panelWidth / panelHeight))) {
                        var left = panelWidth - (panelHeight / height) * width;
                        $mdBgImage.css({width: "auto", height: panelHeight + "px"});
                        if(left < 0) {
                            $mdBgImage.css({left: (left/2) + "px", top: 0 });
                        } else {
                            $mdBgImage.css({left: 0, top: 0 });
                        }
                    } else {
                        var top = panelHeight - (panelWidth / width) * height;
                        $mdBgImage.css({width: panelWidth + "px", height: "auto"});
                        if(top < 0) {
                            $mdBgImage.css({top: (top/2) + "px", left: 0 });
                        } else {
                            $mdBgImage.css({left: 0, top: 0 });
                        }
                    }
                }
            }
        }
        $(window).resize(function() {
            pageResize();
        });
		function getImgSize(imgSrc) {
            var newImg = new Image();
            newImg.src = imgSrc;
            return {height: newImg.height, width: newImg.width};
        }
        var $mdBgImage = $(".md-bg-image img");
        if($mdBgImage.size() > 0) {
			var size = $mdBgImage.size(),
				i = 0;
			$mdBgImage.each(function() {
				$(this).load(function() {
					if(!$(this).data('defW')) {
						i++;
						var dimensions = getImgSize($(this).attr("src"));
						$(this).data({
							'defW': dimensions.width,
							'defH': dimensions.height
						});
						if(i == size) pageReady();
					}
				});
				if(this.complete) {
					$(this).load();
				}
			});
            
        }
		pageResize();
		function pageReady() {
			pageResize();
		}
    });
});
