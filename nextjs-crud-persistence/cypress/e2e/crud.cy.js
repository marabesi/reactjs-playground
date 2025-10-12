/// <reference types="cypress" />
import {generateUniqueId} from "../support/commands";

const url = 'http://localhost:3000'

const name = (cy) => cy.get('[data-testid="name"]')
const isEnabled = (cy) => cy.get('[data-testid="is_enabled"]')
const itemDetails = (cy) => cy.get('[data-testid="item-details"]')
const submit = (cy) => cy.get('[data-testid="submit"]')
const formItem = (cy) => cy.get('[data-testid="form-item"]')
const deleteButtonFor = (cy, itemName) => cy.get(`[data-testid="delete-${itemName}"]`)
const editButtonFor = (cy, itemName) => cy.get(`[data-testid="edit-${itemName}"]`)
const viewButtonFor = (cy, itemName) => cy.get(`[data-testid="view-${itemName}"]`)

const createItem = (cy, itemName) => {
    formItem(cy).should('be.visible')
    name(cy).type(itemName)
    isEnabled(cy).check()
    submit(cy).click()
}

describe('crud app with dynamodb', () => {
  beforeEach(() => {
    cy.visit(url)
  })

  it('creates an item', () => {
      const itemName = `test-${generateUniqueId()}`
      createItem(cy, itemName)
      cy.get('table tbody tr').should('contain', itemName)
  })

  it('deletes an item', () => {
      const itemName = `test-${generateUniqueId()}`
      createItem(cy, itemName)
      deleteButtonFor(cy, itemName).click()
      cy.get('table tbody tr').should('not.exist')
  })

    it('updated an item', () => {
        const itemName = `test-${generateUniqueId()}`
        createItem(cy, itemName)
        editButtonFor(cy, itemName).click()

        const updatedName = `updated-${generateUniqueId()}`;
        name(cy).clear().type(updatedName)

        submit(cy).click()

        cy.get('table tbody tr').should('not.contain', itemName)
        cy.get('table tbody tr').should('contain', updatedName)
    })

    it('view an item', () => {
        const itemName = `test-${generateUniqueId()}`
        createItem(cy, itemName)

        viewButtonFor(cy, itemName).click()

        itemDetails(cy).should('contain', itemName)
        itemDetails(cy).should('contain', 'Enabled: Yes')
    })
})
