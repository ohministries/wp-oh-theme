jQuery(document).ready(function ($) {
    if (typeof wp.media !== 'undefined') {
        console.log("I'm here!");
        $('#publish').click(function () {
            alert("Publishing!");
        });

        var imageSelector = wp.media.featuredImage.frame();

        imageSelector.on('select', function () {
            var attachment = getAttachment();
            console.log(attachment);
            var attachment_url = attachment.sizes.large.url;
            var attachment_width = attachment.sizes.large.width;
            var attachment_height = attachment.sizes.large.height;
            makeImageDialog(attachment_url, attachment_width);
        });

        function getAttachment() {
            return imageSelector.state().get('selection').first().toJSON();
        }

        function makeImageDialog(attachment_url, attachment_width) {
            var cropper =
                '<div class="featuredCropper">' +
                '<div id="featuredWrapper"><img src="' + attachment_url + '" /><div class="drag"></div></div>' +
                '</div>';
            $('body').append(cropper);
            var drag_height = (2 * attachment_width) / 19;
            var drag = $('.drag');
            drag.css({'height': drag_height});
            drag.draggable({containment: "#featuredWrapper", axis: "y"})
        }

        $(document).keyup(function (e) {
            if (e.keyCode == 13) {
                featuredImageCropSave();
            } // enter
            if (e.keyCode == 27) {
                featuredImageCropCancel();
            } // esc
        });

        function featuredImageCropSave() {
            console.log('Saving!');
            closeCropper();
        }

        function featuredImageCropCancel() {
            console.log('Canceling!');
            closeCropper();
        }

        function closeCropper() {
            $('.featuredCropper').remove();
        }
    }
});
