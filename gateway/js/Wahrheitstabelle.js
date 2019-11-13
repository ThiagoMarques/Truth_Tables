

/*
	(C) 2019 Christian Gottschall - all rights reserved
*/


class Wahrheitstabelle {

	constructor( expr, html_id ) {
		this.expr = expr;
		this.var_cnt = expr.constants.length;
		this.val = (1 << this.var_cnt) - 1;
		this.html_id = html_id;
		this.tab = document.createElement("table");
	}

	dom_obj() {
		return this.tab;
	}

	html_table( detail ) {
		var	container = document.getElementById( this.html_id ),
			tab = this.tab,
			tb = document.createElement("tbody"),
			th = document.createElement("thead");

		tab.className = detail ? "Detailtabelle" : "Uebersichtstabelle";

		tab.style.width = "auto";

		for ( var i = container.children.length-1; i >= 0; i-- )
			container.children[i].remove();

		var r = document.createElement("tr"), c = null, t;

		tb.style.zIndex = 5;

		for ( var j = 0; j < this.var_cnt; j++ ) {
			c = document.createElement("th");
			t = document.createTextNode( this.expr.constants[j] );
			c.appendChild(t);
			r.appendChild(c);

		}
		if ( c )
			c.style.paddingRight = "1em";

		if ( detail ) {
			this.expr.toHtml( r );
		} else {
			c = document.createElement("th");
			c.style.textAlign = "center";
			t = document.createTextNode( this.expr.toString() );
			c.appendChild(t);
			r.append(c);
		}

		th.appendChild(r);
		tab.appendChild(th);

		for ( var i = this.val; i >= 0; i-- ) {
			r = document.createElement("tr");

			for ( var j = 0; j < this.var_cnt; j++ ) {
				c = document.createElement("td");
				t = document.createTextNode(
					(i & (1 << (this.var_cnt - j - 1))) ? "T" : "F"
				    );
				c.appendChild(t);
				r.appendChild(c);
			}
			c.style.paddingRight = "1em";

			if ( detail ) {
				this.expr.evaluate_to_html( i, null, r, 0 );
			} else {

				c = document.createElement("td");
				c.style.textAlign = "center";
				t = document.createTextNode(
					this.expr.evaluate( i ) ?  "T" : "F"
				);
				c.appendChild(t);
				r.appendChild(c);
			}

			tb.appendChild(r);
		}

		tab.appendChild(tb);

		container.appendChild(tab);

		container.scrollIntoView(true);
	}

}


