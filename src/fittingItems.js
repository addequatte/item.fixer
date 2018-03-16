"use strict";

class fittingItems {
    constructor(args){
        this.settings = {
            rowCount : args.rowCount ? args.rowCount : 3,
            boxSelector: args.boxSelector ? args.boxSelector :'#fittingBox',
            itemSelector : 'img'
        };
        this.fittingBox = document.querySelector(this.settings.boxSelector);
        this.items = this.fittingBox.querySelectorAll(this.settings.itemSelector);
        this.boxWidth = this.fittingBox.offsetWidth;
        this.allWidth = 0;
        this.itemArr = [];

        this.init();
    }
    init(){
        for(let item of this.items){
            item.style.height = '100px';
            this.itemArr.push(item.offsetWidth);
        }
        this.doFixingItems();
    }
    doFixingItems(){
        for(let i = 0 ; i < this.itemArr.length; i++){
            this.allWidth += this.itemArr[i];
            if((i+1)%this.settings.rowCount === 0){
                for (let m = i - (this.settings.rowCount - 1); m < i+1; m++){
                    this.items[m].style.width = this.items[m].offsetWidth * (this.boxWidth/this.allWidth)+'px';
                    this.items[m].style.height = this.items[m].offsetHeight * (this.boxWidth/this.allWidth)+'px';
                }
                this.allWidth = 0;
            }
            if(i === this.itemArr.length - 1 && this.allWidth !== 0){
                let a;
                if(this.itemArr.length > this.settings.rowCount)
                    a = (this.itemArr.length%this.settings.rowCount) - 1;
                else
                    a = this.itemArr.length - 1;
                for (let m = i - a; m < this.itemArr.length; m++){
                    this.items[m].style.width = this.items[m].offsetWidth * (this.boxWidth/this.allWidth)+'px';
                    this.items[m].style.height = this.items[m].offsetHeight * (this.boxWidth/this.allWidth)+'px';
                }
            }
        }
    }
}