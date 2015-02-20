function setUpTangle () {

	Tangle.formats.format_nobrothers = function(value, max_num_bros) {
    	if (value == 0) { return "no"; }
    	return "" + value + " out of " + max_num_bros;
    };

    Tangle.classes.v_if = {
        //initialize: function (element, options, tangle, variable) { ... },  // optional
        update: function (element, value) {
            if (element.hasClass("invertIf")) { value = !value; }
            element.setStyle("display", !value ? "none" : "initial");//(element.get("tag") == "span") ? "inline" : "block");
        }
    };

	function numberWithCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

    var tangle2 = new Tangle(document.getElementById("example"), {
        initialize: function () {
            this.hsin_hsins_eaten = 50;

            this.budget_housetotal =  {"FALL2014": 81150.00, "SPRING2015": 81650.00};
            this.budget_brothertotal = {"FALL2014": 23259.53,"SPRING2015": 25833.75};
            this.prev_housebill = {"FALL2014": 3925.00};

            this.numMMOutOfHouse = 1;
            this.numCWOutOfHouse = 3;
            this.numJBOutOfHouse = 0;

            this.classSizeIncrease = 2;
            this.noPayHouseBill = 1;

            this.a_nbro_outhouse = 5;

            this.nbros = 38;
        },
        update: function () {

            /* Introduction */
            if (this.hsin_hsins_eaten <= 20) {
                this.what_hsin_hsin_did_to_me = "craved more";
            } else {
                this.what_hsin_hsin_did_to_me = "gained "+this.hsin_hsins_eaten*0.5+"lbs";
                if (this.hsin_hsins_eaten > 60) {
                    this.what_hsin_hsin_did_to_me += " and became fluent in Chinese";
                }
            }

            /* Examining Fall 2015 */

            this.bylaw_satisfied = (this.numMMOutOfHouse+this.numJBOutOfHouse == 0 && this.numCWOutOfHouse <= 1) ? 1 : 0;
            this.base_outbill = this.budget_brothertotal["FALL2014"]/29.;
            this.base_housebill = this.budget_housetotal["FALL2014"]/Math.max(28,29-this.numMMOutOfHouse-this.numCWOutOfHouse-this.numJBOutOfHouse)+this.base_outbill;
            this.base_housebill_improvement = this.prev_housebill["FALL2014"]-this.base_housebill;

            this.mm_inhouse = 6-this.numMMOutOfHouse;
            this.mm_totalfine = (6-this.mm_inhouse)*this.base_housebill-this.numMMOutOfHouse*this.base_outbill;
            this.mm_perbrofine = this.mm_totalfine / 6.;

            this.cw_inhouse = 13-this.numCWOutOfHouse;
            this.cw_totalfine = (12-this.cw_inhouse)*this.base_housebill-this.numCWOutOfHouse*this.base_outbill;
            if (this.cw_totalfine < 0) { this.cw_totalfine = 0; }
            this.cw_perbrofine = this.cw_totalfine / 13.;

            this.jb_inhouse = 10-this.numJBOutOfHouse;
            this.jb_totalfine = (10-this.jb_inhouse)*this.base_housebill-this.numJBOutOfHouse*this.base_outbill;
            this.jb_perbrofine = this.jb_totalfine / 10.;

            this.total_fees = this.mm_totalfine + this.cw_totalfine + this.jb_totalfine;


            /* A different style of budget meeting */
            this.a_allin_housebill = (this.budget_housetotal["SPRING2015"] + this.budget_brothertotal["SPRING2015"]) / this.nbros;
            this.a_inhouse_extrafee = this.budget_housetotal["SPRING2015"] / (this.nbros-this.a_nbro_outhouse) + this.budget_brothertotal["SPRING2015"] / this.nbros - this.a_allin_housebill;

        }
    });


}
