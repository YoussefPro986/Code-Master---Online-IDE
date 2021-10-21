function editor()
    {
        if($('#promo-css-editor').length)
            {
                var targetCss = $('#promo-css-editor').data('target');
                var editorCss = ace.edit("promo-css-editor");
                editorCss.setValue($(targetCss).val());
                editorCss.setTheme("ace/theme/chrome");
                editorCss.getSession().setMode("ace/mode/css");
                editorCss.getSession().setUseWrapMode(true);
                editorCss.on('change', function(){
                    $(targetCss).val(editorCss.getValue());
                    $(targetCss).trigger('change');
                });
            }
        if($('#promo-html-editor').length)
            {
                var targetHtml = $('#promo-html-editor').data('target');
                var editorHtml = ace.edit("promo-html-editor");
                editorHtml.setValue($(targetHtml).val());
                editorHtml.setTheme("ace/theme/chrome");
                editorHtml.getSession().setMode("ace/mode/html");
                editorHtml.getSession().setUseWrapMode(true);
                editorHtml.on('change', function(){
                    $(targetHtml).val(editorHtml.getValue());
                    $(targetHtml).trigger('change');
                    
                });
            }
        if($('#promo-js-editor').length)
            {
                var targetJs = $('#promo-js-editor').data('target');
                var editorJs = ace.edit("promo-js-editor");
                editorJs.setValue($(targetJs).val());
                editorJs.setTheme("ace/theme/chrome");
                editorJs.getSession().setMode("ace/mode/javascript");
                editorJs.getSession().setUseWrapMode(true);
                editorJs.on('change', function(){
                    $(targetJs).val(editorJs.getValue());
                    $(targetJs).trigger('change');
                });
            }
        function changehtmleditor(val)
        {
            editorHtml.setValue(val);
        }
    }

function livePreview()
    {
        if($('.preview').length)
            {
                
                $('#promo-css,#promo-js,#promo-html').on('change', function() {
                    var el = $(this);
                    var target = el.data('type');
                    var val = el.val();
                    $('.preview').find(target).html(val);
                });
                
                $('.preview-options input').keyup(function() {
                    var el = $(this);
                    var root = el.parent();
                    var css = root.data('css');
                    var val = el.val();
                    if(val == 0)
                        {
                            val = '100%';
                        }
                    if(css == 'width')
                        {
                            $('.preview').animate({
                                width: val
                            });
                        }
                    if(css == 'height')
                        {
                            $('.preview').animate({
                                height: val
                            });
                        }
                    
                });
                $('.align .preview-icon').click(function() {
                    var align = $(this).data('preview-align');
                    var root = $(this).parent();
                    root.find('.preview-icon').removeClass('active');
                    $(this).addClass('active');
                    $('.preview-icon').each(function(k,el) {
                        $('.preview').removeClass($(el).data('preview-align'));
                    });
                    $('.preview').addClass(align);
                });
                $('.device .preview-icon').click(function() {
                    var device = $(this).data('preview-device');
                    var root = $(this).parent();
                    root.find('.preview-icon').removeClass('active');
                    $(this).addClass('active');
                    $('.preview-icon').each(function(k,el) {
                        $('.preview').removeClass($(el).data('preview-device'));
                    });
                    $('.preview').addClass(device);
                    switch (device)
                    {
                        case 'mobile':
                            $('[data-preview-align="center"]').click();
                            $('#preview-width').val(375);
                            $('#preview-height').val(667);
                            $('#preview-width,#preview-height').trigger('keyup');
                            break;
                        case 'tab':
                            $('[data-preview-align="center"]').click();
                            $('#preview-width').val(480);
                            $('#preview-height').val(687);
                            $('#preview-width,#preview-height').trigger('keyup');
                            break;
                        case 'laptop':
                            $('[data-preview-align="center"]').click();
                            $('#preview-height').val($('.preview').width()*0.5625);
                            $('#preview-width,#preview-height').trigger('keyup');
                            break;
                        default :
                            $('#preview-width').val(0);
                            $('#preview-height').val(0);
                            $('#preview-width,#preview-height').trigger('keyup');
                            break;
                    }
                    
                });
            }
    }

function createImgNode(src)
    {
        var node = $('<div class="col-sm-6"> <div class="promo-images-wrapper" style="background-image: url('+src+');"> <div class="hover"> <div class="form-group"> <div class="btn btn-info set-bg">Set Background</div></div><div class="promo-bg-options"> </div><div class="url"> <div class="live-input"> <input type="text" class="img-url text-center form-control" value="'+src+'"> </div><div class="btn btn-info"  data-toggle="tooltip" data-original-title="Copy">Copy URL</div></div></div></div></div>');
        
        $('.image-images-container').append(node);
        copyUrl();
        setBgOptions();
    }
    
    function copyUrl()
    {
        $('.url .btn').click(function(e) {
            e.preventDefault();
            var root = $(this).parent();
            var target = root.find('.img-url');
            $('input').blur();
            target.select();
            try {
                // copy text
                document.execCommand('copy');
                target.blur();
                $(this).attr('data-original-title','Copied').tooltip('fixTitle') .tooltip('show');
              
            }
            catch (err) {
              alert('please press Ctrl/Cmd+C to copy');
            }
        });
    }
    
    function setBgOptions()
    {
        $('.set-bg').click(function(e) {
            e.preventDefault();
            var root = $(this).parentsUntil('body','.promo-images-wrapper').last();
            var node = $('<div> <div class="row"> <div class="col-xs-6"> <div class="live-input form-group active"> <select class="form-control repeat"> <option value="">repeat Type</option> <option value="repeat">Repeat</option> <option value="repeat-x">Repeat-x</option> <option value="repeat-y">Repeat-y</option> <option value="no-repeat">No-repeat</option> </select> </div></div><div class="col-xs-6"> <div class="live-input form-group active"> <select class="form-control size"> <option value="">Backgeound Size</option> <option value="cover">Cover</option> <option value="contain">Contain</option> </select> </div></div></div></div><div class="form-group"> <div class="row"> <div class="col-xs-3"> <label>X -</label> </div><div class="col-xs-9"> <div class="live-input active"> <select class="form-control x-pos"> <option value="">Position</option> <option value="left">Left</option> <option value="center">Center</option> <option value="right">Right</option> </select> </div></div></div></div><div class="form-group"> <div class="row"> <div class="col-xs-3"> <label>Y -</label> </div><div class="col-xs-9"> <div class="live-input active"> <select class="form-control y-pos"> <option value="">Position</option> <option value="top">Top</option> <option value="center">Center</option> <option value="bottom">Bottom</option> </select> </div></div></div></div>');
            $('.promo-bg-options').html('');
            root.find('.promo-bg-options').html(node);
            $('.img-url').removeClass('bg-img-url');
            root.find('.img-url').addClass('bg-img-url');
            bgval();
        });
        
        function bgval()
        {
            $('.promo-bg-options .form-control').on('change', function() {
                $('#promo-bg').trigger('change');
            });
            
            
            $('#promo-bg').on('change', function() {
                var size = $('.promo-bg-options .size').val();
                var repeat = $('.promo-bg-options .repeat').val();
                var xPos = $('.promo-bg-options .x-pos').val();
                var yPos = $('.promo-bg-options .y-pos').val();
                var src = $('.bg-img-url').val();
                var bgVal = 'url('+src+') '+xPos+' '+yPos+' '+size;
                //$('#promo-bg').val(bgVal);
                console.log(bgVal);
                $('.preview').css({
                    backgroundImage: 'url('+src+')',
                    backgroundPosition: xPos+' '+yPos,
                    backgroundSize: size,
                    backgroundRepeat: repeat
                });
            });
        }
    }
    
    function DNDfileUploader()
    {
        if($('.dnd-file-handler').length)
            {
                var dnd = $(".dnd-file-handler");
                var fileinput = $('.dnd-file-uploader [type="file"]');
                dnd.click(function() {
                    fileinput.click();
                });
                dnd.on('dragenter', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    $(this).css({
                        borderStyle:'dashed',
                        borderColor:'#00c0ef',
                        color: '#00c0ef'
                    });
                });
                dnd.on('dragover', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                });
                dnd.on('drop', function (e) {
                    e.preventDefault();
                    $(this).css({
                        borderStyle:'solid',
                        borderColor:'#ccc',
                        color: '#ccc'
                    });
                    var img = e.originalEvent.dataTransfer.files;
                    fileHandler(img[0]);
                });
                fileinput.on('change', function() {
                    fileHandler(this.files[0]);
                });
                function fileHandler(file)
                {
                    var fr = new FileReader();
                    fr.onload = function(e) {
                        var fileload = e.target.result;
                        createImgNode(fileload);
                    }
                    fr.readAsDataURL(file);
                }
            }
    }





editor();
livePreview();
copyUrl();
setBgOptions();
DNDfileUploader();


$(window).on('load',function() {
        if($('.preview').length)
            {
                $('#promo-css,#promo-js,#promo-html').trigger('change');
            }
    });