'use strict';


window.onload = function(){

    function createElement(tag, props, ...children) {       // helper for render DOM
        const element = document.createElement(tag);
    
        Object.keys(props).forEach(key => {
            if (key.startsWith('data-')) {
                element.setAttribute(key, props[key]);
            } else {
                element[key] = props[key];
            }
        });
    
        children.forEach(child => {
            if (typeof child === 'string') {
                child = document.createTextNode(child);
            }
    
            element.appendChild(child);
        });
    
        return element;
    }
    
    function handleEvent(){
        const outCheck = document.getElementById('without');
        outCheck.addEventListener('change', function(){
            if(outCheck.checked){
                getTickets();                
            }
        }); 
    }
    
    function getTickets(){
        let req = new XMLHttpRequest();
        req.open('GET', 'tickets.json', true);
        req.onreadystatechange = function(){
            if(this.status == 200 && this.readyState == 4){
                let data = JSON.parse(req.responseText);
                let tickets = data.tickets;
                console.log(outCheck(tickets));
                renderBlocksHTML(outCheck(tickets));
            }
        }
        req.send();
    }


    function filterJSON(tickets, number){
        return tickets.filter(function(elem){
            if(elem.stops == number){
                return elem;
            }
        });
    }

    function outCheck(tickets){
        return filterJSON(tickets, 0);
    }

    function renderBlocksHTML(tickets){
        const content = document.getElementById('tickets');
        for(let i =0;i<tickets.length;++i){
            let price = createElement('button', {className : 'price'})
            const buy_ticket = createElement('div', {className : 'buy-ticket'}, price);
            const blocks_tickets = createElement('div', {className: 'block-tickets'}, buy_ticket);
            price.innerHTML = tickets[i].price;
            content.appendChild(blocks_tickets);
        }
        console.log(content);
        // buy_ticket.appendChild(price);
        return content;
    }

    handleEvent();
}












