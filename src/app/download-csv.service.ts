import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DownloadCSVService {
    downloadFile(data, filename = 'data') {
        let csvData = this.ConvertToCSV(data, [
            'id','name', 'age', 'average', 'approved', 'description'
        ]);
        console.log(csvData)
        let blob = new Blob(['\ufeff' + csvData], {
            type: 'text/csv;charset=utf-8;'
        });
        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        // let isSafariBrowser = navigator.userAgent.indexOf(
        //     'Safari') != -1 & amp; & amp;
        navigator.userAgent.indexOf('Chrome') == -1;
        // /if Safari open in new window to save file with random filename. 
        // if (isSafariBrowser) {
        //     / 
        //     dwldLink.setAttribute("target", "_blank");
        // }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    }
    ConvertToCSV(objArray, headerList) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        var row = "";

        for (var index in objArray[0]) {
            //Now convert each value to string and comma-separated
            row += index + ',';
        }
        row = row.slice(0, -1);
        //append Label row with line break
        str += row + '\r\n';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','

                line += array[i][index];
            }
            str += line + '\r\n';
        }
        return str;
    }
}
