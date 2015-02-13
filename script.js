function setUpTangle () {

	Tangle.formats.format_nobrothers = function(value, max_num_bros) {
    	if (value == 0) { return "no"; }
    	return "" + value + " out of " + max_num_bros;
    };

	function numberWithCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

    var tangle2 = new Tangle(document.getElementById("example2"), {
        initialize: function () {
            this.budget_housetotal =  81650.00;
            this.budget_brothertotal = 25833.75;

            this.numMMOutOfHouse = 1;
            this.numCWOutOfHouse = 3;
            this.numJBOutOfHouse = 0;

            this.housebill = 3500;
            this.outhousebill = 600;

            this.classSizeIncrease = 2;
            this.noPayHouseBill = 1;

            this.a_nbro_outhouse = 5;

            this.nbros = 38;
        },
        update: function () {
            this.mm_extrahousebills = Math.max(0,this.numMMOutOfHouse);
            this.mm_totalfine = this.mm_extrahousebills * this.housebill - this.numMMOutOfHouse * this.outhousebill;
            this.mm_perbrofine = this.mm_totalfine / 6.;

            this.cw_extrahousebills = Math.max(0,this.numCWOutOfHouse-1);
            this.cw_totalfine = this.cw_extrahousebills * this.housebill - this.numCWOutOfHouse * this.outhousebill;;
            this.cw_perbrofine = this.cw_totalfine / 13.;

            this.jb_extrahousebills = Math.max(0,this.numJBOutOfHouse);
            this.jb_totalfine = this.jb_extrahousebills * this.housebill - this.numJBOutOfHouse * this.outhousebill;;
            this.bj_perbrofine = this.jb_totalfine / 6.;

            if (this.numMMOutOfHouse == 0) {
            	this.MMrequirement = "would meet the requirement with all brothers living in the house"
            } else {
            	this.MMrequirement = "need all of them to live in the house so they would be responsible for paying <strong>"+(this.numMMOutOfHouse)+" extra housebills</strong>"
            }

            if (this.numCWOutOfHouse <= 1) {
            	this.CWrequirement = "would meet the requirement with at least 12 brothers living in the house"
            } else {
            	this.CWrequirement = "are allowed one brother living on campus but would be responsible for paying <strong>"+(this.numCWOutOfHouse-1)+" extra housebills</strong>"
            }

            if (this.numJBOutOfHouse == 0) {
            	this.JBrequirement = "would meet the requirement with all brothers living in the house"
            } else {
            	this.JBrequirement = "need all of them to live in the house so they would be responsible for paying <strong>"+(this.numJBOutOfHouse)+" extra housebills</strong>"
            }

            var total = this.mm_totalfine + this.cw_totalfine + this.jb_totalfine;
            this.casesofbeer = total / 15.30;
            this.dinnersathsinhsin = total / 9.36;
            this.rushes = total / 12000.;

            this.inhousebill_after_fines = total;
            this.outhousebill_after_fines = total;

            /* A different style of budget meeting */
            this.a_allin_housebill = (this.budget_housetotal + this.budget_brothertotal) / this.nbros;
            this.a_inhouse_extrafee = this.budget_housetotal / (this.nbros-this.a_nbro_outhouse) + this.budget_brothertotal / this.nbros - this.a_allin_housebill;

        }
    });

    
}
