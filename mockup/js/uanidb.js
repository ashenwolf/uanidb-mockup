var anime_id=1;
var jqXHR = null;
$.support.cors = true;

$("#ukr_name_genre").on("input", function() {
	$("#ukr_name_genre").attr("data-changed","1");
});	
$("#studio_name").on("input", function() {
	$("#studio_name").attr("data-changed","1");
});	
$("#tooltip").on("mouseleave", function (e) {
	var goingto=e.relatedTarget || e.toElement;	
	if(!$(goingto).closest("#crop-holder").length)$('#tooltip').fadeOut(400);
});
$("#crop-holder").on("mousedown", function (e) {
	if($('#tooltip').is(":visible"))$('#tooltip').fadeOut(400);
});	
$("#crop-holder").on("mouseup", function (e) {
	if(!$('#tooltip').is(":visible")) $('#tooltip').fadeIn(400);
});		
$("#crop-holder").on("mouseenter", function (e) {
	if(!$('#tooltip').is(":visible")){
		$("body").append($('#tooltip'));
		var pos=$('#crop-holder').offset();
		$('#tooltip').css('left', pos.left+265);
		$('#tooltip').css('top', e.pageY-70);	
		$('#tooltip').fadeIn(400);		
	}
});	
$("#crop-holder").on("mouseleave", function (e) {
	//$('#tooltip').remove();
	var goingto=e.relatedTarget || e.toElement;	
	if(!$(goingto).closest("#tooltip").length)$('#tooltip').fadeOut(400);
});	
$(document).on("click","#file_from_disk", function (e) {
	$("#fileupload").click();
});
$(document).on("click","#button-file-url", function (e) {
	if(!$(".anime-title").attr('data-anime-id'))return;
	if($(".anime-title").attr('readonly'))return;
	if($("#file_from_url").val()=='')return;
	if(validateURL($("#file_from_url").val())){
		get_pic_from_url($("#file_from_url").val());
	}else {
		$('#files-notice').addClass('error');
		$('#files-notice').html('Це не URL!<a href="#close" class="icon-remove"></a>').show();	
	}
});
$("#imgPhoto").on("dblclick", function() {
	$("#fileupload").click();
});
$("#main-image-a").on("click", function() {
	if(!$(".anime-title").attr('readonly')){
		$("#add-fileupload-lightbox").click();
	}
});
$("#button-save").on("click", function() { 
	if($('#imgPhoto').attr('data-uploaded')){
		$("#anime-image").one("load", function() {
			$('#anime-image').css('left', '0');
			$('#anime-image').css('top', '0');
		}).attr('src', $('#imgPhoto').attr("src"));
		if($('#anime-image').attr('data-uploaded')==1) $('#anime-image').attr('data-uploaded','2');
		else $('#anime-image').attr('data-uploaded','1');
		if(!$(".anime-title").attr("data-changed")) $(".anime-title").attr("data-changed","1");
	}
	var left=$("#imgPhoto").position().left-$('#anime-image').attr('data-diff-w');
	var top=$("#imgPhoto").position().top-$('#anime-image').attr('data-diff-h');
	if($('#anime-image').position().left!=left){
		$('#anime-image').animate({'left': left});
		$("#button-save").attr("data-changed", "1");
		if(!$(".anime-title").attr("data-changed")) $(".anime-title").attr("data-changed","1");
	}
	if($('#anime-image').position().top!=top){
		$('#anime-image').animate({'top': top});
		//delete_file('anime.jpg');
		$("#button-save").attr("data-changed", "2");
		if(!$(".anime-title").attr("data-changed")) $(".anime-title").attr("data-changed","1");
	}
	$.fancybox.close();	
});
$(".form-input").on("input", function() {
	$("#add_genre").attr("data-changed","1");
});	
$(".form-textarea").on("input", function() {
	$("#add_genre").attr("data-changed","1");
});	
$(".form-input2").on("input", function() {
	$("#add_studio").attr("data-changed","1");
});	
$(".form-textarea2").on("input", function() {
	$("#add_studio").attr("data-changed","1");
});	
$(document).on('#fancybox-content').keypress(function (e) {
	if (e.which == 13) {
		if ($("#add_genre").attr("data-changed")){
			$('#genre-post').trigger('click');	
			return false;
		} else {
			$('#studio-post').trigger('click');	
			return false;
		}
	}
});
$("#select-type").change(function() {
	if($("#select-type").val()=='0') {
		$("#input-type").val('');
		toogle_TV_date(1);
	}
	else {
		$("#input-type").val($("#select-type").find(":selected").text());
		if($("#select-type").val()=='4') toogle_TV_date(1);
		else toogle_TV_date(0);
	}
	$("#input-type").trigger('input');
});
$("#genre-post").on("click", function() {
	if(!$(".anime-title").attr('readonly') && $('#ukr_name_genre').val()){
		if($('#genre-post').attr("data-edit")){
			edit_genres($('#genre-post').attr("data-edit"));
		}
		else add_genres();
	}
});
$("#studio-post").on("click", function() {
	if(!$(".anime-title").attr('readonly') && $('#studio_name').val()){
		if($('#studio-post').attr("data-edit")){
			edit_studios($('#studio-post').attr("data-edit"));
		}
		else add_studios();
	}
});
$(document).on("click", ".token-input-token-facebook p", function() {
	alert("Перехід на "+$(this).text());
});
$(document).on("mouseenter", ".token-input-token-facebook", function() {
	if($(this).closest('#td-studios').length) $("p",this).attr('title', 'Перейти на сторінку студії');
	else $("p",this).attr('title', 'Перейти на сторінку жанра');
	$("p",this).css("text-decoration","underline");
	$("p",this).css('cursor', 'pointer');
});	
$(document).on("mouseleave", ".token-input-token-facebook", function() {
	$("p",this).css("text-decoration","none");
	$("p",this).css('cursor', 'auto');
});	
$(".anime-title").on("input", function() {
	$(".anime-title").attr("data-changed","1");
	$(".anime-info[name='ukr_name_1']").attr("data-changed","1");
});	
$(".anime-info").on("input", function() {
	$(this).attr("data-changed","1");
	if(!$(".anime-title").attr("data-changed")) $(".anime-title").attr("data-changed","1");
});		
$(".anime-info[name='ukr_name_1']").on("input", function() {
	$(".anime-title").attr("data-changed","1");
});
$(".anime-title").keyup(function() {
	$(".anime-info[name='ukr_name_1']").val($(this).val());
});
$(".anime-info[name='ukr_name_1']").keyup(function() {
	$(".anime-title").val($(this).val()).trigger('autosize');		
});
$("#synopsis").on("keyup", function() {
	if(!$(".anime-title").attr("data-changed")) $(".anime-title").attr("data-changed","1");
	if(!$("#synopsis").attr("data-changed")) $("#synopsis").attr("data-changed","1");
});	
$("#anime-edit").click(function (e) {
	if($(".anime-title").attr('readonly')){
		$( ".datepicker" ).datepicker( "option", { disabled: false } );
		$("#select-type").show();
		$("#input-type").hide();		
		$(document).off('click', '.token-input-token-facebook p');
		$(document).on("click", ".token-input-token-facebook", function() {
			var text=$("p",this).text();
			if($(this).closest('#td-studios').length){
				var input_studios=$('#anime-studios').tokenInput('get',{name: text});			
				var selected_studio = $(input_studios).filter(function(){
					return this.name == text;
				});
				if(selected_studio[0].id!=selected_studio[0].name){
					get_studio(selected_studio[0].id);			
					$('#studio-post').attr('data-edit', selected_studio[0].id);
					$('#add-studio-lightbox').trigger('click');
				}else{
					$('#add-studio-lightbox').trigger('click');
					$("#add_studio").attr("data-id", selected_studio[0].id);
					$('#studio_name').val(selected_studio[0].id);
				}			
			}else{				
				var input_genres=$('#anime-genres').tokenInput('get',{name: text});			
				var selected_genre = $(input_genres).filter(function(){
					return this.name == text;
				});
				if(selected_genre[0].id!=selected_genre[0].name){
					get_genre(selected_genre[0].id);			
					$('#genre-post').attr('data-edit', selected_genre[0].id);
					$('#add-genre-lightbox').trigger('click');
				}else{
					$('#add-genre-lightbox').trigger('click');
					$("#add_genre").attr("data-id", selected_genre[0].id);
					$('#ukr_name_genre').val(selected_genre[0].id);
				}	
			}
		});	
		$(document).off('mouseenter', '.token-input-token-facebook');
		$(document).on("mouseenter", ".token-input-token-facebook", function() {
			$("p",this).attr('title', 'Клікніть для редагування');
			$("p",this).css('cursor', 'pointer');
			$(this).css('cursor', 'pointer');
		});
		$(document).off('mouseleave', '.token-input-token-facebook');
		$(document).on("mouseleave", ".token-input-token-facebook", function() {
			$(this).css('cursor', 'auto');
		});
		$(".anime-title").attr('readonly', false);
		$(".anime-info").attr('readonly', false);
		$("#synopsis").attr('contenteditable', true);
		$('#anime-genres').tokenInput("toggleDisabled");	
		$('#anime-studios').tokenInput("toggleDisabled");		
		$(this).html( '<i class="icon-edit"></i> Закінчити редагування');
		$("#info-edit .icon-edit").css('color', 'rgb(238, 86, 15)');
		$(".block-content").css('-moz-box-shadow', '0 0 8px rgb(255, 144, 42)');
		$(".block-content").css('-webkit-box-shadow', '0 0 8px rgb(255, 144, 42)');			
		$(".block-content").css('box-shadow', '0 0 8px rgb(255, 144, 42)');
		$(".anime-title").addClass('info-focused');
		$(".anime-info").addClass('info-focused');
	}else{
		if($(".anime-title").attr('data-changed')){
			if($(".anime-title").attr('data-anime-id')){
				if(update_anime($(".anime-title").attr('data-anime-id'))){
					alert ("something is fucked!");
					return;
				}					
			}	
		}
		if($("#anime-genres").attr("data-changed") && $(".anime-title").attr('data-anime-id')) {				
			update_genres($(".anime-title").attr('data-anime-id'));												
		}		
		if($("#anime-studios").attr("data-changed") && $(".anime-title").attr('data-anime-id')) {				
			update_studios($(".anime-title").attr('data-anime-id'));												
		}		
		$(document).off("click", ".token-input-token-facebook p");
		$(document).off("click", ".token-input-token-facebook");
		$(document).on("click", ".token-input-token-facebook p", function() {
			alert("Перехід на "+$(this).text());
		});
		$(document).off('mouseenter', '.token-input-token-facebook');
		$(document).on("mouseenter", ".token-input-token-facebook", function() {
			$(this).attr('title', '');
			if($(this).closest('#td-studios').length) $("p",this).attr('title', 'Перейти на сторінку студії');
			else $("p",this).attr('title', 'Перейти на сторінку жанра');
			$("p",this).css("text-decoration","underline");
			$("p",this).css('cursor', 'pointer');
		});	
		$(document).off('mouseleave', '.token-input-token-facebook');
		$(document).on("mouseleave", ".token-input-token-facebook", function() {
			$("p",this).css("text-decoration","none");
			$("p",this).css('cursor', 'auto');
		});				
		$("#select-type").hide();
		$("#input-type").show();	
		$('#anime-genres').tokenInput("toggleDisabled");
		$('#anime-studios').tokenInput("toggleDisabled");
		$(".anime-title").attr('readonly', true);
		$(".anime-info").attr('readonly', true);
		$("#synopsis").attr('contenteditable', false);
		$(this).html( '<i class="icon-edit"></i> Редагувати інформацію');
		$("#info-edit .icon-edit").css('color', 'inherit');	
		$(".block-content").css('-moz-box-shadow', 'none');
		$(".block-content").css('-webkit-box-shadow', 'none');	
		$(".block-content").css('box-shadow', 'none');	
		$(".anime-title").removeClass('info-focused');
		$(".anime-info").removeClass('info-focused');
		$( ".datepicker" ).datepicker( "option", { disabled: true } );
	}
});
$("#ANN_info").click(function (e) {
	if($(".anime-title").attr('readonly')){			
		if(anime_id<10){
			get_anime(anime_id);
			//get_types(anime_id);
			get_anime_genres(anime_id);
			get_anime_studios(anime_id++);
			return false;
		}else{
			get_anime(anime_id); 
			//get_types(anime_id);
			get_anime_genres(anime_id);
			get_anime_studios(anime_id);
			anime_id=1; 
			return false;
		}
	}else return false;
});	
if ($.browser.msie && $.browser.version == 10) { 	<!-- ========= I'M FUCKING AT A LOSS HERE... =============== -->
	$(".anime-title").css("padding-bottom","10px");
	$(".anime-title").css("margin-top","0px");
}		

// anime

function get_anime(id){
	$.ajax({ 
		type: 'GET', 
		url: 'http://oilreview.x10.mx/anime.php', 
		data: { aid: id }, 
		cache: false,
		dataType: 'json',
		beforeSend: function (){
			$('.notice').html('Працюю з базою...');	
			$('#anime-image').attr('src', 'images/no-anime-medium.gif');
			$('#main-image a').attr('href', '#');
			$('#loading-image').show();
			$('#anime-image').css('left','auto');
			$('#anime-image').css('top','auto');
		},
		success: function (data) { 
			$(".anime-title").attr('data-anime-id', data.anime_id);
			$(".anime-title").val(data.ukr_name_1).trigger('autosize');
			$(".anime-info[name='jap_name_rom_1']").attr('value', data.jap_name_rom_1);
			$(".anime-info[name='eng_name_1']").attr('value', data.eng_name_1);
			$(".anime-info[name='jap_name_kan_1']").attr('value', data.jap_name_kan_1);
			$(".anime-info[name='ukr_name_1']").attr('value', data.ukr_name_1);
			$(".anime-info[name='other_nazv']").attr('value', data.other_nazv);
			$("#select-type").val(data.type_film_id);			
			if($("#select-type").val()=='0'){
				$("#input-type").val('');
				toogle_TV_date(1);
			}
			else {				
				if($("#select-type").val()=='4') toogle_TV_date(1);
				else toogle_TV_date(0);
				$("#input-type").val($("#select-type option:selected").text());
			}
			$("#series_count").val(data.series_count);
			$("#duration").val(data.duration);
			if(data.date_begin!="0000-00-00") $("#date_begin").datepicker( "setDate", $.datepicker.parseDate( "yy-mm-dd",data.date_begin));
			else  $("#date_begin").val('');
			if(data.date_end!="0000-00-00") $("#date_end").datepicker( "setDate", $.datepicker.parseDate( "yy-mm-dd",data.date_end));
			else  $("#date_end").val('');
			$("#synopsis").html(data.sinopsis);			
			if (data.poster){
				if(imageProportions(data.anime_id+'.jpg')){
					$("#anime-image").one("load", function() {
						//$('#anime-image').animate({'left':parseInt(data.poster_x_pos),'top':parseInt(data.poster_y_pos)});
						$('#anime-image').css('left', parseInt(data.poster_x_pos));
						$('#anime-image').css('top', parseInt(data.poster_y_pos));
					}).attr('src', 'http://uanidb.tk/pics/timthumb.php?src=http://uanidb.tk/pics/anime/'+data.anime_id+'.jpg&h=365&'+$('#main-image-a').attr('data-mtime'));
				}else{
					$("#anime-image").one("load", function() {
						//$('#anime-image').animate({'left':parseInt(data.poster_x_pos),'top':parseInt(data.poster_y_pos)});
						$('#anime-image').css('left', parseInt(data.poster_x_pos));
						$('#anime-image').css('top', parseInt(data.poster_y_pos));
					}).attr('src', 'http://uanidb.tk/pics/timthumb.php?src=http://uanidb.tk/pics/anime/'+data.anime_id+'.jpg&w=265&'+$('#main-image-a').attr('data-mtime'));
				}
				$('#main-image a').attr('href', 'http://uanidb.tk/pics/anime/'+data.anime_id+'.jpg'+'?'+$('#main-image-a').attr('data-mtime'));				
			}else{
				$('#anime-image').attr('src', 'images/no-anime-medium.gif');
				$('#main-image a').attr('href', 'images/no-anime-medium.gif');
			}			
			$('.notice').html('Все ок!');
			$('#loading-image').hide();
		},
		error: function(jqXHR, textStatus, errorThrown){
			$('#loading-image').hide();
			$('.notice').html(jqXHR+' | '+textStatus+' | '+errorThrown);
		}
	});
}

function update_anime(id){
	var myData={};
	myData['anime_id']=id;
	$('.anime-info').each(function(i, obj) {
		if($(this).attr("name") && $(this).attr("data-changed")){
			if($(this).attr('id')=='input-type') myData[$(this).attr("name")]=$('#select-type').val();
			else if($(this).attr('class').split(" ",1)[0]=='datepicker') {
				myData[$(this).attr("name")]=$.datepicker.formatDate("yy-mm-dd", $.datepicker.parseDate("dd.mm.yy",$(this).val()));
			} else myData[$(this).attr("name")]=$(this).val().replace(/'/g,"\\\\'").replace(/"/g,'\\"');
			$(this).removeAttr("data-changed");
		}
	});	
	if($("#synopsis").attr("data-changed")){
		myData['sinopsis']=$("#synopsis").html().replace(/'/g,"\\\\'").replace(/"/g,'\\"');
	}
	if($("#button-save").attr("data-changed")){
		if($("#button-save").attr("data-changed")==1) myData['poster_x_pos']= $('#anime-image').position().left;
		if($("#button-save").attr("data-changed")==2) myData['poster_y_pos']= $('#anime-image').position().top;
	}
	if($("#anime-image").attr('data-uploaded')==1) {
		imageRename($(".anime-title").attr('data-anime-id')+'-temp.jpg');
		$("#anime-image").removeAttr('data-uploaded');
	} else if($("#anime-image").attr('data-uploaded')==2){
		imageRename($(".anime-title").attr('data-anime-id')+'-temp2.jpg');
		$("#anime-image").removeAttr('data-uploaded');
	}	
	$.ajax({ 
		type: 'POST', 
		crossDomain:true,
		url: 'http://oilreview.x10.mx/anime.php', 
		data: {anime_update:JSON.stringify(myData)}, 
		dataType: 'json',
		cache: false,
		beforeSend: function (){
			$('.notice').html('Працюю з базою...');
		},
		success: function (data) {
			$('.anime-info').each(function(i, obj) {	
				if($(this).attr("name") && $(this).attr("data-changed")){
					$(this).removeAttr("data-changed");
				}					
			});
			if($("#synopsis").attr("data-changed"))$("#synopsis").removeAttr("data-changed");
			if($("#button-save").attr("data-changed"))$("#button-save").removeAttr("data-changed");
			$(".anime-title").removeAttr("data-changed").trigger('autosize');
			if (data=="0")$('.notice').html('Всі зміни записано!');
			else $('.notice').html(data);
			return 0;
		},
		error: function(jqXHR, textStatus, errorThrown){
			$('.notice').html(jqXHR+' | '+textStatus+' | '+errorThrown);
			return 1;
		}
	});
}

// genres

function get_anime_genres(id){		
	$.ajax({ 
		type: 'GET', 
		url: 'http://oilreview.x10.mx/genres.php', 
		data: { aid: id }, 
		dataType: 'json',
		cache: false,
		beforeSend: function (){
			$('.notice').html('Працюю з базою...');
		},
		success: function (data) { 
			genres_populate=[];
			genres_populate=data;
			$('#anime-genres').tokenInput('destroy');
			init_genres();
			$('.notice').html('Все ок!');
		},
		error: function(jqXHR, textStatus, errorThrown){
			$('.notice').html(jqXHR+' | '+textStatus+' | '+errorThrown);
		}
	});
}

function update_genres(id){
	var myData={};
	myData['anime_id']=id;
	var genres=$('#anime-genres').tokenInput("get");
	for(var i=0;i<genres.length;i++){
		myData[genres[i].id]=genres[i].name;
	}
	$.ajax({ 
		type: 'POST', 
		crossDomain:true,
		url: 'http://oilreview.x10.mx/genres.php', 
		data: {genres_update:JSON.stringify(myData)}, 
		dataType: 'json',
		cache: false,
		beforeSend: function (){
			$('.notice').html('Працюю з базою...');
		},
		success: function (data) {	
			$("#anime-genres").removeAttr("data-changed");
			if (data=="0")$('.notice').html('Всі зміни записано!');
			else $('.notice').html(data);
			return 0;
		},
		error: function(jqXHR, textStatus, errorThrown){
			$('.notice').html(jqXHR+' | '+textStatus+' | '+errorThrown);
			return 1;
		}
	});
}

function add_genres(){
	var myData={};
	//myData['anime_id']=id;
	myData['ukr_name_genre']=$('#ukr_name_genre').val();
	myData['jap_rom_name_genre']=$('#jap_rom_name_genre').val();
	myData['jap_kana_name_genre']=$('#jap_kana_name_genre').val();
	myData['opys']=$('#opys').val();
	$.ajax({ 
		type: 'POST', 
		crossDomain:true,
		url: 'http://oilreview.x10.mx/genres.php', 
		data: {genres_add:JSON.stringify(myData)}, 
		dataType: 'json',
		cache: false,
		beforeSend: function (){
			$('#genre-notice').html('Працюю з базою...' + '<a href="#close" class="icon-remove"></a>');
			$('#genre-notice').show();
		},
		success: function (data) {	
			if (!isNaN(parseInt(data))){
				$('#genre-notice').addClass('success');
				$('#genre-notice').html('Жанр додано!'+'<a href="#close" class="icon-remove"></a>');
				if($("#add_genre").attr("data-id")){
					$('#anime-genres').tokenInput("remove", {id: $('#add_genre').attr("data-id")});
					$('#add_genre').removeAttr("data-id");
				}
				$('#anime-genres').tokenInput("add", {id: data, name: $('#ukr_name_genre').val()});
				$('#token-input-anime-genres').css('width','20px');
				$.fancybox.close();			
				$('#token-input-anime-genres').focus();
				return true;
			}
			else{
				$('#genre-notice').removeClass('success');
				$('#genre-notice').html(data+'<a href="#close" class="icon-remove"></a>');
				return false;
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			$('#genre-notice').removeClass('success');
			$('#genre-notice').html(jqXHR+' | '+textStatus+' | '+errorThrown+'<a href="#close" class="icon-remove"></a>');
			return false;
		}
	});
}

function get_genre(id){		
	$.ajax({ 
		type: 'GET', 
		url: 'http://oilreview.x10.mx/genres.php', 
		data: { g: id }, 
		dataType: 'json',
		cache: false,
		beforeSend: function (){
			$('#genre-notice').html('Зчитую...' + '<a href="#close" class="icon-remove"></a>');
			$('#genre-notice').show();
			$('body').css('cursor', 'wait');
		},
		success: function (data) { 
			$('#ukr_name_genre').val(data.ukr_name_genre);
			$('#jap_kana_name_genre').val(data.jap_kana_name_genre);
			$('#jap_rom_name_genre').val(data.jap_rom_name_genre);
			$('#opys').val(data.opys);
			$('#genre-notice').hide();
			$('body').css('cursor', 'auto');
		},
		error: function(jqXHR, textStatus, errorThrown){
			$('#genre-notice').removeClass('success');
			$('#genre-notice').html(jqXHR+' | '+textStatus+' | '+errorThrown+'<a href="#close" class="icon-remove"></a>');
		}
	});
}

function edit_genres(gid){
	var myData={};
	myData['gid']=gid;
	myData['ukr_name_genre']=$('#ukr_name_genre').val().replace(/"/g,'\\"');
	myData['jap_rom_name_genre']=$('#jap_rom_name_genre').val().replace(/"/g,'\\"');
	myData['jap_kana_name_genre']=$('#jap_kana_name_genre').val().replace(/"/g,'\\"');
	myData['opys']=$('#opys').val().replace(/"/g,'\\"');
	$.ajax({ 
		type: 'POST', 
		crossDomain:true,
		url: 'http://oilreview.x10.mx/genres.php', 
		data: {genre_update:JSON.stringify(myData)}, 
		dataType: 'json',
		cache: false,
		beforeSend: function (){
			$('#genre-notice').html('Працюю з базою...' + '<a href="#close" class="icon-remove"></a>');
			$('#genre-notice').show();
		},
		success: function (data) {	
			if (!isNaN(parseInt(data))){
				if($("#ukr_name_genre").attr("data-changed")){
					$('#anime-genres').tokenInput("remove", {id: gid});
					$('#anime-genres').tokenInput("add", {id: gid, name: $('#ukr_name_genre').val()});
					$("#ukr_name_genre").removeAttr("data-changed");
				}
				$('#genre-notice').addClass('success');
				$('#genre-notice').html('Жанр відредаговано!'+'<a href="#close" class="icon-remove"></a>');
				$('#token-input-anime-genres').css('width','20px');
				$('#genre-post').removeAttr("data-edit");				
				$.fancybox.close();				
				$('#token-input-anime-genres').focus();
				return true;
			}
			else{
				$('#genre-notice').removeClass('success');
				$('#genre-notice').html(data+'<a href="#close" class="icon-remove"></a>');
				return false;
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			$('#genre-notice').removeClass('success');
			$('#genre-notice').html(jqXHR+' | '+textStatus+' | '+errorThrown+'<a href="#close" class="icon-remove"></a>');
			return false;
		}
	});
}

// studios

function get_anime_studios(id){		
	$.ajax({ 
		type: 'GET', 
		url: 'http://oilreview.x10.mx/studios.php', 
		data: { aid: id }, 
		dataType: 'json',
		cache: false,
		beforeSend: function (){
			$('.notice').html('Працюю з базою...');
		},
		success: function (data) { 
			studios_populate=[];
			studios_populate=data;
			$('#anime-studios').tokenInput('destroy');
			init_studios();
			$('.notice').html('Все ок!');
		},
		error: function(jqXHR, textStatus, errorThrown){
			$('.notice').html(jqXHR+' | '+textStatus+' | '+errorThrown);
		}
	});
}

function update_studios(id){
	var myData={};
	myData['anime_id']=id;
	var studios=$('#anime-studios').tokenInput("get");
	for(var i=0;i<studios.length;i++){
		myData[studios[i].id]=studios[i].name;
	}
	$.ajax({ 
		type: 'POST', 
		crossDomain:true,
		url: 'http://oilreview.x10.mx/studios.php', 
		data: {studios_update:JSON.stringify(myData)}, 
		dataType: 'json',
		cache: false,
		beforeSend: function (){
			$('.notice').html('Працюю з базою...');
		},
		success: function (data) {	
			$("#anime-studios").removeAttr("data-changed");
			if (data=="0")$('.notice').html('Всі зміни записано!');
			else $('.notice').html(data);
			return 0;
		},
		error: function(jqXHR, textStatus, errorThrown){
			$('.notice').html(jqXHR+' | '+textStatus+' | '+errorThrown);
			return 1;
		}
	});
}

function add_studios(){
	var myData={};
	myData['studio_name']=$('#studio_name').val();
	myData['studio_name_jap']=$('#studio_name_jap').val();
	myData['desc_1']=$('#desc_1').val();
	$.ajax({ 
		type: 'POST', 
		crossDomain:true,
		url: 'http://oilreview.x10.mx/studios.php', 
		data: {studios_add:JSON.stringify(myData)}, 
		dataType: 'json',
		cache: false,
		beforeSend: function (){
			$('#studio-notice').html('Працюю з базою...' + '<a href="#close" class="icon-remove"></a>');
			$('#studio-notice').show();
		},
		success: function (data) {	
			if (!isNaN(parseInt(data))){
				$('#studio-notice').addClass('success');
				$('#studio-notice').html('Жанр додано!'+'<a href="#close" class="icon-remove"></a>');
				if($("#add_studio").attr("data-id")){
					$('#anime-studios').tokenInput("remove", {id: $('#add_studio').attr("data-id")});
					$('#add_studio').removeAttr("data-id");
				}
				$('#anime-studios').tokenInput("add", {id: data, name: $('#studio_name').val()});
				$('#token-input-anime-studios').css('width','20px');
				$.fancybox.close();			
				$('#token-input-anime-studios').focus();
				return true;
			}
			else{
				$('#studio-notice').removeClass('success');
				$('#studio-notice').html(data+'<a href="#close" class="icon-remove"></a>');
				return false;
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			$('#studio-notice').removeClass('success');
			$('#studio-notice').html(jqXHR+' | '+textStatus+' | '+errorThrown+'<a href="#close" class="icon-remove"></a>');
			return false;
		}
	});
}

function get_studio(id){		
	$.ajax({ 
		type: 'GET', 
		url: 'http://oilreview.x10.mx/studios.php', 
		data: { s: id }, 
		dataType: 'json',
		cache: false,
		beforeSend: function (){
			$('#studio-notice').html('Зчитую...' + '<a href="#close" class="icon-remove"></a>');
			$('#studio-notice').show();
			$('body').css('cursor', 'wait');
		},
		success: function (data) { 
			$('#studio_name').val(data.studio_name);
			$('#studio_name_jap').val(data.studio_name_jap);
			$('#desc_1').val(data.desc_1);
			$('#studio-notice').hide();
			$('body').css('cursor', 'auto');
		},
		error: function(jqXHR, textStatus, errorThrown){
			$('#studio-notice').removeClass('success');
			$('#studio-notice').html(jqXHR+' | '+textStatus+' | '+errorThrown+'<a href="#close" class="icon-remove"></a>');
		}
	});
}

function edit_studios (sid){
	var myData={};
	myData['sid']=sid;
	myData['studio_name']=$('#studio_name').val().replace(/"/g,'\\"');
	myData['studio_name_jap']=$('#studio_name_jap').val().replace(/"/g,'\\"');
	myData['desc_1']=$('#desc_1').val().replace(/"/g,'\\"');
	$.ajax({ 
		type: 'POST', 
		crossDomain:true,
		url: 'http://oilreview.x10.mx/studios.php', 
		data: {studio_update:JSON.stringify(myData)}, 
		dataType: 'json',
		cache: false,
		beforeSend: function (){
			$('#studio-notice').html('Працюю з базою...' + '<a href="#close" class="icon-remove"></a>');
			$('#studio-notice').show();
		},
		success: function (data) {	
			if (!isNaN(parseInt(data))){
				if($("#studio_name").attr("data-changed")){
					$('#anime-studios').tokenInput("remove", {id: sid});
					$('#anime-studios').tokenInput("add", {id: sid, name: $('#studio_name').val()});
					$("#studio_name").removeAttr("data-changed");
				}
				$('#studio-notice').addClass('success');
				$('#studio-notice').html('Студію відредаговано!'+'<a href="#close" class="icon-remove"></a>');
				$('#token-input-anime-studios').css('width','20px');
				$('#studio-post').removeAttr("data-edit");				
				$.fancybox.close();				
				$('#token-input-anime-studios').focus();
				return true;
			}
			else{
				$('#studio-notice').removeClass('success');
				$('#studio-notice').html(data+'<a href="#close" class="icon-remove"></a>');
				return false;
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			$('#studio-notice').removeClass('success');
			$('#studio-notice').html(jqXHR+' | '+textStatus+' | '+errorThrown+'<a href="#close" class="icon-remove"></a>');
			return false;
		}
	});
}

//-----------------------------------

function get_types(id){		
	$.ajax({ 
		type: 'GET', 
		url: 'http://uanidb.tk/type.php', 
		data: { aid: id }, 
		dataType: 'json',
		cache: false,
		beforeSend: function (){
			//$('.notice').html('Працюю з базою...');
		},
		success: function (data) { 
			$("#select-type").val('');
			$("#select-type").empty();	
			$("#select-type").append($("<option />").val(0).text("Не обрано"));
			$.each(data, function() {
				$("#select-type").append($("<option />").val(this.tid).text(this.name));
			});
			//$('.notice').html('Все ок!');
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert(textStatus, errorThrown);
		}
	});
}

$("#anime-error").click(function (e) {
});

var genres_populate=[];
var studios_populate=[];

function init_genres(){
	$('#anime-genres').tokenInput("http://oilreview.x10.mx/genres.php", {
			prePopulate: genres_populate,
			preventDuplicates: true,
			tokenLimit: 10,
			minChars: 2,
			crossDomain: false,
			theme: "facebook",
			hintText: "Текст+Пошук існуючих або Текст+Enter: додати новий",
			searchingText: "Шукаю...",
			noResultsText: "Не знайдено",
			disabled: true,
			searchDelay: 100,
			onAdd: genres_change,
			onDelete: genres_change,
			allowFreeTagging: true
	});		
	if($("#anime-genres").attr("data-changed"))$("#anime-genres").removeAttr("data-changed");
}

function genres_change(item){
	if(item.name.length<2){
		$('#anime-genres').tokenInput("remove", {id: item.id}); 
		return false;
	}
	if(!$("#anime-genres").attr("data-changed")) {
		$("#anime-genres").attr("data-changed","1");
	}
}

function init_studios(){
	$('#anime-studios').tokenInput("http://oilreview.x10.mx/studios.php", {
			prePopulate: studios_populate,
			preventDuplicates: true,
			tokenLimit: 10,
			minChars: 2,
			crossDomain: false,
			theme: "facebook",
			hintText: "Текст+Пошук існуючих або Текст+Enter: додати нову",
			searchingText: "Шукаю...",
			noResultsText: "Не знайдено",
			disabled: true,
			searchDelay: 100,
			onAdd: studios_change,
			onDelete: studios_change,
			allowFreeTagging: true
	});		
	if($("#anime-studios").attr("data-changed"))$("#anime-studios").removeAttr("data-changed");
}

function studios_change(item){
	if(item.name.length<2){
		$('#anime-studios').tokenInput("remove", {id: item.id}); 
		return false;
	}
	if(!$("#anime-studios").attr("data-changed")) {
		$("#anime-studios").attr("data-changed","1");
	}
}

function text_area_height_opera(){	<!-- ========= I'M FUCKING AT A LOSS HERE... =============== -->
	if ($.browser.opera){
		var txt=$(".anime-title");
		//txt.scrollTop(txt[0].scrollHeight - txt.height());
		txt.height( txt[0].scrollHeight);
		txt.css("margin-top","0px");
	}
}

function fancyboxLoad(selectedArray, selectedIndex, selectedOpts){
	if($(".anime-title").attr('readonly')){			
		return false;
	}else if(selectedArray[selectedIndex].id=="add-genre-lightbox"){	
		$('#genre-notice').removeClass('success');
		$('#genre-notice').hide();
		$('#ukr_name_genre').val('');
		$('#jap_rom_name_genre').val('');
		$('#jap_kana_name_genre').val('');
		$('#opys').val('');
		if(!$('#genre-post').attr("data-edit")){
			$('#genre-post').text('Додати жанр');
			this.title='Створити і додати новий жанр';
		}
		else {
			$('#genre-post').text('Редагувати жанр');
			this.title='Редагування жанру';
		}
		return true;
	} else{
		$('#studio-notice').removeClass('success');
		$('#studio-notice').hide();
		$('#studio_name').val('');
		$('#studio_name_jap').val('');
		$('#desc_1').val('');
		if(!$('#studio-post').attr("data-edit")){
			$('#studio-post').text('Додати студію');
			this.title='Створити і додати нову студію';
		}
		else {
			$('#studio-post').text('Редагувати студію');
			this.title='Редагування студії';
		}
		return true;
	}
}

function lightboxComplete(){
	$('.lightbox-div').css('width','auto');
}

function fancyboxClose(){
	if($('#genre-post').attr("data-edit")){
		$('#genre-post').removeAttr("data-edit");
		$('#genre-post').text('Додати жанр');
	}
	if($("#add_genre").attr("data-changed")) $("#add_genre").removeAttr("data-changed");
	if($('#studio-post').attr("data-edit")){
		$('#studio-post').removeAttr("data-edit");
		$('#studio-post').text('Додати студію');
	}
	if($("#add_studio").attr("data-changed")) $("#add_studio").removeAttr("data-changed");
	if($("#ukr_name_genre").attr("data-changed"))$("#ukr_name_genre").removeAttr("data-changed");
	if($("#studio_name").attr("data-changed"))$("#studio_name").removeAttr("data-changed");
	$('.lightbox-div').css('width','465');
}

// fileupload

function fileuploadLoad(){
	if($(".anime-title").attr('readonly')){			
		return false;
	}else{	
		$('#files-notice').hide();
		//$('#progress .bar').css('width', '0');
		$("#file_from_url").val('');
		var diff_w=$("#anime-image").width()-$("#crop-holder").width();
		var diff_h=$("#anime-image").height()-$("#crop-holder").height();	
		$('#anime-image').attr('data-diff-w', diff_w);
		$('#anime-image').attr('data-diff-h', diff_h);
		$("#crop-iholder").width(Math.round($("#anime-image").width()+diff_w));
		$("#crop-iholder").height(Math.round($("#anime-image").height()+diff_h));	
		$("#crop-iholder").css("left", Math.round(-diff_w));
		$("#crop-iholder").css("top", Math.round(-diff_h));
		$( "#imgPhoto" ).draggable({ containment: "parent"});
		$( "#imgPhoto" ).css('left',$("#anime-image").position().left+diff_w);
		$( "#imgPhoto" ).css('top',$("#anime-image").position().top+diff_h);												
		$("#imgPhoto").attr('src', $('#anime-image').attr('src'));		
		return true;
	}		
}

function fileuploadComplete(){
	$('#add_files').css('width','auto');
}

function fileuploadClose(){	
	if(jqXHR) jqXHR.abort();
	if($('#imgPhoto').attr('data-uploaded')){
		if($("#anime-image").attr('data-uploaded')==1) delete_file('http://uanidb.tk/pics/anime/'+$(".anime-title").attr('data-anime-id')+'-temp2.jpg');
		else delete_file('http://uanidb.tk/pics/anime/'+$(".anime-title").attr('data-anime-id')+'-temp.jpg');
		$('#imgPhoto').removeAttr('data-uploaded');
	}
	$('#add_files').css('width','310');
	$('#tiptip_holder').hide();
}

function delete_file(file){		
	$.ajax({ 
		type: 'DELETE', 
		url: 'http://uanidb.tk/pics/?file='+file, 
		data: {}, 
		dataType: 'json',
		cache: false,
		beforeSend: function (){
			//$('.notice').html('Працюю з базою...');
		},
		success: function (data) { 			
			//$('.notice').html('Все ок!');
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert(textStatus, errorThrown);
		}
	});
}

$('#imgPhoto').bind('fileuploadsubmit', function (e, data) {
    if($(".anime-title").attr('data-anime-id')){
		//$('#progress .bar').css('width', '0');
		if($("#anime-image").attr('data-uploaded')==1) data.formData = {'newname':$(".anime-title").attr('data-anime-id')+'-temp2.jpg','url':'http://oilreview.kiev.ua/wp-content/woo_custom/pic-broken-trend.jpg'};
		else data.formData = {'newname':$(".anime-title").attr('data-anime-id')+'-temp.jpg','url':'http://oilreview.kiev.ua/wp-content/woo_custom/pic-broken-trend.jpg'};
	}
	else return false;
});

// image proportions check

function imageProportions(source){
	var proportions=0;
	$.ajax({ 
		type: 'GET', 
		url: 'http://uanidb.tk/pics/pic.php', 
		data: {pic:'http://uanidb.tk/pics/anime/'+source},
		dataType: 'json',
		cache: false,
		async: false,
		beforeSend: function (){
			//$('.notice').html('Працюю з базою...');
		},
		success: function (data) { 
			//alert(data.width/data.height+' and '+265/365);
			if(data.width/data.height > 265/365) {
				proportions=1;		
			}else proportions=0;
			$('#main-image-a').attr('data-mtime', data.mtime);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('something wrong with getting image size');
		}
	});
	return proportions;
}

function imageRename(source){
	$.ajax({ 
		type: 'POST', 
		url: 'http://uanidb.tk/pics/pic.php', 
		data: {rename:source},
		dataType: 'json',
		cache: false,
		beforeSend: function (){
			//$('.notice').html('Працюю з базою...');
		},
		success: function (data) { 
			//var d = new Date();
			//d=d.getTime();
			var src=$('#anime-image').attr('src');
			$('#anime-image').attr('src', src.replace(/(-temp|-temp2).jpg/,'.jpg'));
			$('#main-image-a').attr('href', 'http://uanidb.tk/pics/anime/'+$(".anime-title").attr('data-anime-id')+'.jpg?'+data.mtime);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('something wrong with renaming image');
		}
	});
}

$(document).bind('drop dragover', function (e) {
	e.preventDefault();
});

// url validator

function validateURL(textval) {
  var urlregex = new RegExp("^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-‌​\.\?\,\'\/\\\+&amp;%\$#_]*)?$");
  return urlregex.test(textval);
}

// pic from url

function get_pic_from_url(source){
	//$('#progress .bar').css('width', '0');
	var temp_name=0;
	if($("#anime-image").attr('data-uploaded')==1) temp_name = $(".anime-title").attr('data-anime-id')+'-temp2.jpg';
	else temp_name = $(".anime-title").attr('data-anime-id')+'-temp.jpg';
	$.ajax({ 
		type: 'POST', 
		url: 'http://uanidb.tk/pics/pic_from_url.php', 
		data: {url:source, name:temp_name},
		dataType: 'json',
		cache: false,
		beforeSend: function (){
			loading_image(1);
		},
		success: function (data) { 
			if(data.error){
				$('#files-notice').addClass('error');
				$('#files-notice').html(data.error+ '<a href="#close" class="icon-remove"></a>').show();
				//$('#progress .bar').css('width', '0');
				loading_image(0);	
				return;
			}			
			if(!$('#imgPhoto').attr('data-uploaded')) $('#imgPhoto').attr('data-uploaded', '1');
			//$('#progress .bar').css('width', '0');
			if($("#anime-image").attr('data-uploaded')==1) name = $(".anime-title").attr('data-anime-id')+'-temp2.jpg';
			else name = $(".anime-title").attr('data-anime-id')+'-temp.jpg';
			$('#files-notice').removeClass('error');
			$('#files-notice').hide();
			$('#loading-image2').hide();
			$('#crop-iholder').removeAttr('data-x');
			$('#crop-iholder').removeAttr('data-y');
			$('#crop-iholder').removeAttr('data-w');
			$('#crop-iholder').removeAttr('data-h');
			$('#imgPhoto').removeAttr('data-src');
			$('#imgPhoto').removeAttr('data-x');
			$('#imgPhoto').removeAttr('data-y');			
			imgPhoto_update(name);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('something wrong with renaming image');
		}
	});
}

// imgPhoto update

function imgPhoto_update(name){
	if(imageProportions(name)){
		$("#imgPhoto").one("load", function() {
			$('#imgPhoto').css('left', '0');
			$('#imgPhoto').css('top', '0');
			var diff_w=$("#imgPhoto").width()-$("#crop-holder").width();
			var diff_h=$("#imgPhoto").height()-$("#crop-holder").height();	
			$('#anime-image').attr('data-diff-w', diff_w);
			$('#anime-image').attr('data-diff-h', diff_h);
			$("#crop-iholder").width(Math.round($("#imgPhoto").width()+diff_w));
			$("#crop-iholder").height(Math.round($("#imgPhoto").height()+diff_h));	
			$("#crop-iholder").css("left", Math.round(-diff_w));
			$("#crop-iholder").css("top", Math.round(-diff_h));
		}).attr('src', 'http://uanidb.tk/pics/timthumb.php?src=http://uanidb.tk/pics/anime/'+name+'&h=365&' + new Date().getTime());
	}else{
		$("#imgPhoto").one("load", function() {
			$('#imgPhoto').css('left', '0');
			$('#imgPhoto').css('top', '0');
			var diff_w=$("#imgPhoto").width()-$("#crop-holder").width();
			var diff_h=$("#imgPhoto").height()-$("#crop-holder").height();	
			$('#anime-image').attr('data-diff-w', diff_w);
			$('#anime-image').attr('data-diff-h', diff_h);
			$("#crop-iholder").width(Math.round($("#imgPhoto").width()+diff_w));
			$("#crop-iholder").height(Math.round($("#imgPhoto").height()+diff_h));	
			$("#crop-iholder").css("left", Math.round(-diff_w));
			$("#crop-iholder").css("top", Math.round(-diff_h));
		}).attr('src', 'http://uanidb.tk/pics/timthumb.php?src=http://uanidb.tk/pics/anime/'+name+ '&w=265&' + new Date().getTime());
	}
}

// loading-image icon

function loading_image(flag){
	if(flag==1){		
		$('#imgPhoto').attr('data-src', $('#imgPhoto').attr('src'));
		$("#imgPhoto").one("load", function() {
			$('#imgPhoto').attr('data-x', $('#imgPhoto').css('left'));
			$('#imgPhoto').attr('data-y', $('#imgPhoto').css('top'));
			$('#imgPhoto').css('left', '0');
			$('#imgPhoto').css('top', '0');
			$("#crop-iholder").attr('data-x',$("#crop-iholder").css("left"));
			$("#crop-iholder").attr('data-y',$("#crop-iholder").css("top"));
			$("#crop-iholder").attr('data-w',$("#crop-iholder").css("width"));
			$("#crop-iholder").attr('data-h',$("#crop-iholder").css("height"));
			$("#crop-iholder").css('left', '0');
			$("#crop-iholder").css('top', '0');
			$("#crop-iholder").css('width', '265');
			$("#crop-iholder").css('height', '365');
		}).attr('src', 'images/no-anime-medium.gif');
		$('#loading-image2').show();		
	}else{
		$('#loading-image2').hide();		
		$("#crop-iholder").css('width', $("#crop-iholder").attr('data-w'));
		$("#crop-iholder").css('height', $("#crop-iholder").attr('data-h'));
		$("#crop-iholder").css('left', $("#crop-iholder").attr('data-x'));
		$("#crop-iholder").css('top', $("#crop-iholder").attr('data-y'));
		$('#crop-iholder').removeAttr('data-x');
		$('#crop-iholder').removeAttr('data-y');
		$('#crop-iholder').removeAttr('data-w');
		$('#crop-iholder').removeAttr('data-h');
		$('#imgPhoto').attr('src', $('#imgPhoto').attr('data-src'));
		$('#imgPhoto').css('left', $('#imgPhoto').attr('data-x'));
		$('#imgPhoto').css('top', $('#imgPhoto').attr('data-y'));
		$('#imgPhoto').removeAttr('data-src');	
		$('#imgPhoto').removeAttr('data-x');
		$('#imgPhoto').removeAttr('data-y');		
	}
}

// toogle anime dates design for TV-type 

function toogle_TV_date(flag){
	if(flag){
		$("#anime_date").text('Дати виходу');
		$("#date_begin").attr('placeholder', "початок");
		$(".anime_date_hide").show();	
	}else{
		$("#anime_date").text('Дата виходу');
		$("#date_begin").attr('placeholder', "прем'єра");
		$(".anime_date_hide").hide();
	}
}