Feature: CSS
    As a Web Designer
    I would like to test my CSS

    Scenario: CSS
        Given I go to "/index.html"
         Then the "Little Em" should have "color" of "rgb(255, 69, 0)"
          And the "Little Em" should have "font size" of "20px"
          And run
