Feature: Ticket booking
    Scenario: Must book ticket
        Given user is on start page
        When user select session '19-00'    
            And user seat selection 
            And the user will click the book button  
        Then user will see the message "Вы выбрали билеты:"


    Scenario: Can't buy a booked ticket
        Given user is on start page
        When user select session '19-00'             
        Then the user will see an inactive button "ЗАБРОНИРОВАТЬ"