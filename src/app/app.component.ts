import { Component } from '@angular/core';
import { DownloadCSVService } from '../app/download-csv.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'downloadCSV';
    constructor(private downloadCSV: DownloadCSVService) { }
    // itemChecked: boolean = false;
    itemChecked: boolean;
    checkedInfo: any;
    allCheckedBox: boolean = false;
    selectedData: any = [];
    finalArrayData:any =[];
    Message:any;
    jsonData = [
        {
            id: 1,
            name: "Anil Singh",
            age: 33,
            average: 98,
            approved: true,
            description: "I am active blogger and Author.",
            itemChecked:false
        },
        {
            id: 2,
            name: 'Reena Singh',
            age: 28,
            average: 99,
            approved: true,
            description: "I am active HR.",
            itemChecked:false
        },
        {
            id: 3,
            name: 'Aradhya',
            age: 4,
            average: 99,
            approved: true,
            description: "I am engle.",
            itemChecked:false
        },
    ];

    
    download() {
        console.log("json data" + this.jsonData);
        if (this.itemChecked = true && this.selectedData.length < 0) {
            this.downloadCSV.downloadFile(this.jsonData, 'jsontocsv');
        }
        if (this.itemChecked = false && this.selectedData.length > 0) {
            
            for (var i = 0; i < this.selectedData.length; i++) {
                var arrayFind = this.jsonData.find(employee => employee.id === this.selectedData[i]);
                this.finalArrayData.push(arrayFind); 
                
            }
            console.log(this.finalArrayData);
            this.downloadCSV.downloadFile(this.finalArrayData, 'jsontocsv');
        }
        else{
            this.Message = 'Please checked any chekboxes';
        }


    }

    setCheckBoxTrue($event) {
        if ($event.target.checked == true) {
            this.itemChecked = true;
        } else {
            this.itemChecked = false;
        }
    }

    selectedValue($event, data:any) {
        if($event.target.checked !== false){
            this.selectedData.push(data.id);
            console.log(this.selectedData);
        }else {
            let index = this.selectedData.indexOf(data.id);
            this.selectedData.splice(index, 1);
        }
        if($event.target.checked == false && (data == '')){
            this.Message = 'Please checked any chekboxes';
        }
 }

  
}
