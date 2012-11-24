(function(se){
	se.Util.timeToMinutes = function(time){
		return (time.hours*60) + time.minutes;
	};
	se.Util.minutesToTime = function(minutes){
		var tempHour = minutes/60;
		var hour = Math.floor(tempHour);
		var minutes = (tempHour - hour)*60;
		var time = {
			hours: hour,
			minutes: minutes
		}
		return time;
	};
	se.Util.booleansToDaysOfWeek = function(bDaysOfWeek, nameDaysOfWeek){
		var daysOfWeek = [];
		for(var i = 0; i < bDaysOfWeek.length; ++i){
			if(bDaysOfWeek[i] == 1){
				daysOfWeek.push(nameDaysOfWeek[i]);			
			}
		}
		return daysOfWeek;
	};
	se.Util.getArrayTimes = function(since, to, each){
		var times = [];
		for(i = since; i <= to; i += each){
			var time = se.Util.minutesToTime(i);
			time.hours = se.Util.numberToTimeString(time.hours);
			time.minutes = se.Util.numberToTimeString(time.minutes);
			times.push(time);
		}
		return times;		
	};
	se.Util.numberToTimeString = function(number){ // 9 => 09
		if(number < 10) return '0'+number;
		else return number;
	};
	se.Util.numberToTagType = function(number){
		return ['background','text','border'][number];
	};
	se.Util.dayOfWeekToNumber = function(dayOfWeek){
		return ['mon','tue','wed','thu','fri','sat','sun'].indexOf(dayOfWeek);
	};
	se.Util.nameDayOfWeekToDayOfWeek = function(nameDayOfWeek){
			var langManager = new se.Managers.MultiLangManager();
			nameDaysOfWeek = [langManager._("monday"), langManager._("tuesday"), langManager._("wednesday"), langManager._("thursday"), langManager._("friday"), langManager._("saturday"), langManager._("sunday")];
			
			var indexDayOfWeek = nameDaysOfWeek.indexOf(nameDayOfWeek);
			
			return se.Util.numberToDayOfWeek(indexDayOfWeek);
	};
	se.Util.numberToDayOfWeek = function(number){
		var dayOfWeekData = ['mon','tue','wed','thu','fri','sat','sun'];
		return dayOfWeekData[number];
	};
	se.Util.toJSON = function(form){
        var json = {};
        form.getElements('input, select, textarea', true).each(function(el){
            if (!el.name || el.disabled || el.type == 'submit' || el.type == 'reset' || el.type == 'file') return;
            var value = (el.tagName.toLowerCase() == 'select') ? Element.getSelected(el).map(function(opt){
                return opt.value;
            }) : ((el.type == 'radio' || el.type == 'checkbox') && !el.checked) ? null : el.value;
            Array.from(value).each(function(val){
                if (typeof val != 'undefined') {
                    json[el.name] = val;
                }
            });
        });
        return json;
    }
    
  se.Util.clearForm = function(oForm) {
			var elements = oForm.elements;
			 
			oForm.reset();

			for(i=0; i<elements.length; i++) {
				 
			field_type = elements[i].type.toLowerCase();
		 
			switch(field_type) {
				case "text":
				case "password":
				case "textarea":
				      case "hidden":  
				 	if(elements[i].get('class') != 'color')
				  elements[i].value = "";
				  else{ // Clear color picker
				  	var colorPicker = new jscolor.color(elements[i]);
				  	colorPicker.fromString('FFFFFF');
				  }
				  break;
				   
				case "radio":
				case "checkbox":
				    if (elements[i].checked) {
				      elements[i].checked = false;
				  }
				  break;

				case "select-one":
				case "select-multi":
				            elements[i].selectedIndex = -1;
				  break;

				default:
				  break;
			}
    }
	};
	
	se.Util.resetForm = function(oForm) {
			var elements = oForm.elements;
			 
			oForm.reset();

			for(i=0; i<elements.length; i++) {
			
				 
			field_type = elements[i].type.toLowerCase();
		 	console.log(elements[i].get('disabled'));
		 	if(!elements[i].get('disabled'))
				switch(field_type) {
					case "text":
					case "password":
					case "textarea":
						    case "hidden":  
					 	if(elements[i].get('class') != 'color')
						elements[i].value = "";
						else{ // Clear color picker
							var colorPicker = new jscolor.color(elements[i]);
							colorPicker.fromString('FFFFFF');
						}
						break;
						 
					case "radio":
					case "checkbox":
						  if (elements[i].checked) {
						    elements[i].checked = false;
						}
						break;

					case "select-one":
					case "select-multi":
						break;

					default:
						break;
				}
    }
	}

})(se);
