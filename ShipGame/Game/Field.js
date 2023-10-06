export default {

    FieldElement:undefined,
    FieldMinX:undefined,
    FieldMaxX:undefined,
    FieldMinY:undefined,
    FieldMaxY:undefined,

    Init(FieldElement){
        this.FieldElement = FieldElement;
        this.FieldMinX = FieldElement.offsetLeft;
        this.FieldMinY = FieldElement.offsetTop;
        this.FieldMaxX = this.FieldMinX + FieldElement.offsetWidth;
        this.FieldMaxY = this.FieldMinY + FieldElement.offsetHeight;
    },

}