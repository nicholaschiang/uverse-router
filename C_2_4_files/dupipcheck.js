      /* Javascript routine to warn users who are about to duplicate IP adddresses. We pop-up 
       * a warning and then allow them to override if they want to.
       */
function dupIPcheck()
{
    /* First, loop through the form elements, building two node IP address lists 
     * 1) current in-use addresses (from "CURRENT_IP")
     * 2) addresses being statically assigned (from "NETIDVAL" )
     * 
     * CURRENT_IP element is a simple IP address and is set for every node.
     * NETIDVAL contains a netid number and hashmark, ("17#) optionally followed by an IP address.
     */
    var inuseIPs = new Array();
    var assignIPs = new Array();
    var form = document.forms[0];
//    alert("called dupipcheck(); ver 8");

    var this_IP;
    var nodes = 0;
    for( var i = 0; i < form.length; i++)
    {
        // Current IP address always comes before matching assigned IP
        if( form.elements[i].name == "CURRENT_IP")
            this_IP = form.elements[i].value;

        if( form.elements[i].name == "NETIDVAL" )
        {
            inuseIPs[ nodes ] = this_IP;			// eg "192.168.1.64"
            assignIPs[ nodes ] = form.elements[i].value;	// eg. "17#192.168.1.64" or "17#"

//            alert("Adding inuseIP " + inuseIPs[ nodes ] + " and assignIP " + assignIPs[ nodes ] ); 
            nodes++;
        }
    }

    /* Now check each being-assigning IP against the other nodes current IPs */
    for( var i = 0; i < nodes; i++)
    {
        /* If there is no assigned IP (eg it will be DHCP assigned from pool) skip. We know
         * it's from the pool if there is just netid# with no trailing IP address.
         */
        if( assignIPs[i].charAt(assignIPs[i].length - 1) == "#")     /* May not have trailing IP address */
            continue;

        // Seach the in-use IP list for this new assigned IP
        for( var j = 0; j < nodes; j++)
        {
            if( i == j)     // don't search our own entry, it will often match anyway 
                continue;

//            alert("Checking if " + assignIPs[i] + " == " + inuseIPs[j] );
            if( assignIPs[i].search( inuseIPs[j] ) >= 0 )
            {
                if( confirm("WARNING: about to duplicate in-use IP addresses " + inuseIPs[j] ))
                {
                     break;   /* User said YES */
                }
                else
                {
                    /* user said NO, abort submission. This works best across 
                     * Multiple browsers if we overwrite the form submit 
                     * function with a null function 
                     */
                    form.submit = function() {};    // set submit function to null
                    return false;
                }
            }
        }
    }

    /* No Dups, or user OKed all duplicates. */
    return true;
}

