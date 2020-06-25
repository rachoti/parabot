import { Component, OnInit } from '@angular/core';
import { GeomapComponent } from '../geomap/geomap.component';
import { attachEmbeddedView } from '@angular/core/src/view';
import { template } from '@angular/core/src/render3';
import { forEach } from '@angular/router/src/utils/collection';
import { ExportToCsv } from 'export-to-csv';
//import { getMaxListeners } from 'cluster';
declare var $:any;

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
	finall=[]
	bb;
	aa=[];
	ar;
	filter_data=[];
	isModalOneVisible=false;
	isModalTwoVisible=false;
	isModalThreeVisible=false;
	public changeListener(files: FileList){
	  console.log(files.item(0));
	  if(files && files.length > 0) {
		 let file : File = files.item(0); 
		   console.log(file.name);
		   console.log(file.size);
		   console.log(file.type);
		   let reader: FileReader = new FileReader();
		   reader.readAsText(file);
		   reader.onload = (e) => {
			  let csv: string = reader.result as string;
			  this.ar= csv.split(/\n(?=(?:(?:[^"]*"){2})*[^"]*$)/)
			//  var bb=this.ar[19576].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
			 
			 
			  var temp=this.ar[0]
			  var temp1=temp.split(',')
			  
			  this.bb=(temp1);
			  
		   }

			
		   
		}
		}
	
  constructor() {
	
   }
 
  cc()
  {
	
		
		
		   
			
		  
		}
		
			

  ngOnInit() {
	this.isModalOneVisible=true;
	this.isModalTwoVisible=false;
	this.isModalThreeVisible=false;
	  
  //jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
	
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function(){
	return false;
})

  }
  onclick(){
	this.isModalOneVisible=false;
	this.isModalTwoVisible=true;
	this.isModalThreeVisible=false;
}
onclick1(){
	var ll=this.ar;
	this.aa=[]
	var col_index=[]
		
		  console.log("aa")
		  var neww=[]
		
			
			var message = "Selected Headers\n";
	 
				//Loop through all checked CheckBoxes in GridView.
				$("#Table1 input[type=checkbox]:checked").each(function () {
					
					var row = $(this).closest("tr")[0];
					message += row.cells[1].innerHTML;
					message += "\n";
				neww.push ( row.cells[1].innerHTML)
					
					
				});
	
			var cells = ll[0].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
			console.log(cells)
			for(let i=0;i<neww.length;i++)
			{
				for(let j=0;j<cells.length;j++)
				{
					if(neww[i]==cells[j])
					{
					col_index.push(j)
					}
				}
			
			}
			var temp=[]
				var lineData=[]
			for(let i=0;i<col_index.length;i++)
			{
				this.filter_data.push(neww[i])
			}
		
			for(let i=1;i<ll.length;i++)
			{
				temp=[]
				var row = ll[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
				for(let j=0;j<col_index.length;j++)
				{
					temp.push(row[col_index[j]])
					
				}
			
				var obj=[]
				for(let i=0;i<temp.length;i++)
				{
				
					obj.push({[this.filter_data[i]]:temp[i]});
					
					
				}
			
				lineData.push(obj)
				
			}
		
				
		
			console.log(lineData)
			
			
			for(let i=0;i<lineData.length;i++)
			{
				var output={}
			for(let j=0;j<lineData[i].length;j++)
			{
			
			for (var key in lineData[i][j]) {
				output[key] = lineData[i][j][key];
				
			   }
			   
			}
			  this.finall.push(output)
			   
			}
	const options = { 
		fieldSeparator: ',',
		quoteStrings: '"',
		decimalSeparator: '.',
		showLabels: true, 
		showTitle: true,
		title: '',
		useTextFile: false,
		useBom: true,
		useKeysAsHeaders: true,
		// headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
	  };
	 
	const csvExporter = new ExportToCsv(options);
	 
   csvExporter.generateCsv(this.finall);
	
	this.isModalOneVisible=false;
	this.isModalTwoVisible=false;
	this.isModalThreeVisible=true;
}
onclick2(){
	this.isModalOneVisible=false;
	this.isModalTwoVisible=false;
	this.isModalThreeVisible=true;
}
onclick3(){
	this.isModalOneVisible=true;
	this.isModalTwoVisible=false;
	this.isModalThreeVisible=false;
}
}
