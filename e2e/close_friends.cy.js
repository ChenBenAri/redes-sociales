const shortTime = 1000
const longTime = 2000
const verylongTime = 3000

describe('template spec', () => {
  it('passes', () => {
    cy.request('GET', 'http://192.168.0.108:5000').then((response) => {
      const { name_1, name_2, name_3, user_name, password } = response.body;
      cy.log('Received data:');
      cy.log(`name1: ${name_1}`);
      cy.log(`name2: ${name_2}`);
      cy.log(`name3: ${name_3}`);
      cy.log(`user_name: ${user_name}`);
      cy.log(`password: ${password}`);

      cy.visit('https://www.instagram.com');
      cy.wait(shortTime);
      cy.get(':nth-child(1) > .x1i10hfl > ._acan > ._aacl').click();
      cy.wait(shortTime);
      cy.get(':nth-child(1) > .x1npaq5j > ._aa48 > ._aa4b').type(user_name);
      cy.get(':nth-child(2) > .x1npaq5j > ._aa48 > ._aa4b').type(password);
      cy.wait(longTime);
      cy.get('.xqui205 > :nth-child(3)').click();
      cy.wait(longTime);
      //name_1
      cy.get(':nth-child(2) > .x4k7w5x > .x1n2onr6.x6s0dn4 > .x1i10hfl > .x3nfvp2').click()
      cy.wait(shortTime)
      cy.get('._aauy').type(name_1)
      cy.wait(longTime)
      cy.get(':nth-child(1) > .x1i10hfl > .xxbr6pl').click()
      cy.wait(longTime)
      cy.get('.x1plvlek.x1iyjqo2 > ._acan').click()
      cy.wait(longTime)  
      cy.get('span[class^="x1lliihq x1plvlek xryxfnj"]:contains("close")').click()
      cy.get('body').type('{esc}')   
      cy.wait(verylongTime)   
      //name_2
      cy.get(':nth-child(2) > .x4k7w5x > .x1n2onr6.x6s0dn4 > .x1i10hfl > .x3nfvp2').click()
      cy.wait(shortTime)
      cy.get('._aauy').type(name_2)
      cy.wait(longTime)
      cy.get(':nth-child(1) > .x1i10hfl > .xxbr6pl').click()
      cy.wait(longTime)
      cy.get('.x1plvlek.x1iyjqo2 > ._acan').click()
      cy.wait(longTime) 
      cy.get('span[class^="x1lliihq x1plvlek xryxfnj"]:contains("close")').click()
      cy.get('body').type('{esc}')    
      cy.wait(verylongTime)   
      //name_3
      cy.get(':nth-child(2) > .x4k7w5x > .x1n2onr6.x6s0dn4 > .x1i10hfl > .x3nfvp2').click()
      cy.wait(verylongTime)
      cy.get('._aauy').type(name_3)
      cy.wait(verylongTime)
      cy.get(':nth-child(1) > .x1i10hfl > .xxbr6pl').click()
      cy.wait(verylongTime)
      cy.get('.x1plvlek.x1iyjqo2 > ._acan').click()
      cy.wait(longTime)
      cy.get('span[class^="x1lliihq x1plvlek xryxfnj"]:contains("close")').click()
      cy.get('body').type('{esc}')
      cy.wait(verylongTime)
    })  
  })
})