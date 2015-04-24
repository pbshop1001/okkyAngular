'use strict';

// Tinymce module config
angular.module('tinymce').run(['Menus',
	function(Menus) {
		// Config logic
		// ...
	}
]).value('uiTinymceConfig', {
        plugins: "image, link, fullscreen, code, table, contextmenu, media",
        contextmenu: "link media image inserttable | cell row column deletetable",
        image_advtab: true,
        image_class_list: [
            {title: 'Responsive Size', value: 'img-responsive'}

        ],
        fullscreen_new_window : true,
        fullscreen_settings : {
            theme_advanced_path_location : "top"
        }
    });
