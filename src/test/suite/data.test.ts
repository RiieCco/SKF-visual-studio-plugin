/* eslint-disable max-len */
import {describe, it} from 'mocha';
import * as chai from 'chai';
import chasAsPromised = require('chai-as-promised');
import {getCategoryItems, getChecklistItems, getItemsFromUrl, getTypeItems} from '../../data';
import {ChecklistCategory, ChecklistItem, ChecklistType} from '../../QuickPickItems';

chai.use(chasAsPromised);
const expect = chai.expect;

describe('Fetch data from SKF with:', () => {
  it('#getItemsFromUrl() should return items if valid api endpoint is given', async () => {
    const items = await getItemsFromUrl('/checklist_category/items');

    items.forEach((item: any) => {
      expect(item).to.have.property('id');
      expect(item).to.have.property('name');
      expect(item).to.have.property('description');
    });
  });

  it('#getCategoryItems should return array of ChecklistCategory objects', async () => {
    const items = await getCategoryItems();

    items.forEach((item: any) => {
      expect(item).to.be.instanceOf(ChecklistCategory);
      expect(item).to.have.property('id');
      expect(item).to.have.property('label');
    });
  });

  it('#getTypeItems should return an array of ChecklistType objects if existing id is passed', async () => {
    const items = await getTypeItems(1);

    items.forEach((item: any) => {
      expect(item).to.be.instanceOf(ChecklistType);
      expect(item).to.have.property('id');
      expect(item).to.have.property('label');
    });
  });

  it('#getChecklistItems should return an array of ChecklistItem object if existing id passed', async () => {
    const items = await getChecklistItems(1);

    items.forEach((item: any) => {
      expect(item).to.be.instanceOf(ChecklistItem);
      expect(item).to.have.property('id');
      expect(item).to.have.property('label');
    });
  });
});
