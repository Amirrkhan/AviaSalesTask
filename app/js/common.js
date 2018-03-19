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

    (function main(){
        getTickets();
    })();

    function getTickets(){                                      // send request to JSON file
        let req = new XMLHttpRequest();
        req.open('GET', 'tickets.json', true);
        req.onreadystatechange = function(){
            if(this.status == 200 && this.readyState == 4){
                let data = JSON.parse(req.responseText);
                let tickets = data.tickets;

                const content = document.querySelector('#tickets');
                const checks = document.getElementsByClassName('checks');
                const arrayOfChecks = Array.from(checks);
                arrayOfChecks.forEach((item)=>{
                    item.addEventListener('change', function(){
                        if(!item.checked){
                            content.innerHTML = null;
                            toggleAnimation(content);
                        }
                        else{
                            if (item.id == 'all-check'){
                              render(tickets);
                              toggleAnimation(content);
                            }
                            if(item.id == 'without'){
                                render(filterJSON(tickets, 0));
                                toggleAnimation(content);
                            }
                            else if(item.id == 'one-check'){
                                render(filterJSON(tickets, 1));
                                toggleAnimation(content);
                            }
                            else if(item.id == 'two-check'){
                                render(filterJSON(tickets, 2));
                                toggleAnimation(content);
                            }
                            else if(item.id == 'three-check'){
                                render(filterJSON(tickets, 3));
                                toggleAnimation(content);
                            }
                        }
                    });
              });

            }
        }
        req.send();
    }

    function filterJSON(objects, number){                       //handling and filter stops of file
        return objects.filter(function(elem){
            if(elem.stops == number){
                return elem;
            }
            else if(number === undefined){
              return elem;
            }
        });
    }

    function toggleAnimation(content){
        if(container.classList.contains('hiddenBlock')){
            container.classList.remove('hiddenBlock');
            container.classList.add('display');
        }
        else if(container.classList.contains('display')){
            container.classList.remove('display');
            container.classList.add('hiddenBlock');
        }
    }

    function render(tickets){                                       //creating DOM elements
        const content = document.getElementById('tickets');
        for(let i =0;i<tickets.length;++i){
            const price = createElement('button', {className : 'price'})
            const origin = createElement('span', {className : 'origin'});
            const origin_name = createElement('span', {className : 'origin_name'});
            const departure_time = createElement('span', {className : 'departure_time'});
            const dir_time = createElement('div', {className : 'dir-time'}, departure_time);
            const dir_city = createElement('div', {className : 'dir-city'}, origin, origin_name);
            const dir_date = createElement('div', {className : 'dir-date'});
            const buy_ticket = createElement('div', {className : 'buy-ticket'}, price);
            const dir_item = createElement('div', {className : 'dir-item'}, dir_time, dir_city, dir_date);
            const directions = createElement('div', {className : 'directions'}, dir_item);
            const blocks_tickets = createElement('div', {className: 'block-tickets'}, buy_ticket, directions);

            origin.innerHTML = tickets[i].origin;
            origin_name.innerHTML += ' ' + tickets[i].origin_name;
            price.innerHTML += 'Buy ' + tickets[i].price;
            departure_time.innerHTML = tickets[i].departure_time;
            buy_ticket.classList.add('name-company');
            content.appendChild(blocks_tickets);
        }
        return content;
    }
}
