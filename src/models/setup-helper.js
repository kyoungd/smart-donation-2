
const bankAccountPrefix = '69e2f276-5337-449d-9512-e2ddda42d0';

export const bankAccountIndex = (model) => {
  switch (model) {
    case "customer": return 0;
    case "donor": return 1;
    case "supplier": return 2;
    case "campaign": return 11;
    case "donation": return 18;
    default:
      const errorMessage = 'ERROR at /src/models/setup-helper.js - bankAccountId().  Unknown model: ' + model;
      throw new Error(errorMessage);
  }
}

export const entityPrefix = (model) => {
  switch (model) {
    case 'donor': return 'd';
    case 'customer': return 'c';
    case 'supplier': return 's';
    case 'donation': return 't';
    case 'campaign': return 'a';
    case 'campaignrequest': return 'r';
    case 'product': return 'p';
    case 'transfer': return 'x';
    default:
      return model;
  }
}

export const suffix = (ix) => (ix >= 10 ? ix.toString() : '0' + ix.toString());
export const bankAccountId = (ix) => bankAccountPrefix + suffix(ix);
export const entityId = (prefix, ix) => entityPrefix(prefix) + "-6ee91abf-d094-49e1-9385-d3cbd84b54a9" + (ix ? suffix(ix) : '');
export const refModel = (model, ix, mtype) => {
  switch (model) {
    case 'bankaccount': return `resource:org.acme.smartdonation.util.BankAccount#${bankAccountId(bankAccountIndex(mtype) - 1 + (ix ? ix : 1))}`;
    case 'donor': return `resource:org.acme.smartdonation.participant.Donor#${entityId('d')}`;
    case 'customer': return `resource:org.acme.smartdonation.participant.Customer#${entityId('c')}`;
    case 'supplier': return `resource:org.acme.smartdonation.participant.Supplier#${entityId('s')}`;
    case 'donation': return `resource:org.acme.smartdonation.object.Donation#${entityId('t', ix)}`;
    case 'campaign': return `resource:org.acme.smartdonation.object.Campaign#${entityId('a', ix)}`;
    case 'campaignrequest': return `resource:org.acme.smartdonation.object.CampaignRequest#${entityId('r', ix)}`;
    case 'product': return `resource:org.acme.smartdonation.object.Product#${entityId('p', ix)}`;
    default:
      const errorMessage = 'ERROR at /src/models/setup-helper.js - refModel().  Unknown model: ' + model;
      throw new Error(errorMessage);
  }
}
