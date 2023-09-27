using hc450.officesupplies as officesupplies from '../db/schema';

service CatalogService @(requires: 'authenticated-user')
{ 
 @odata.draft.enabled :true 
 entity Suppliers @(restrict : [
 { grant : [ 'READ' ], to : [ 'Vendor' ] },
 { grant : [ '*' ], to : [ 'ProcurementManager' ] }
 ])as projection on officesupplies.Suppliers;
 entity Products @(restrict : [
 { grant : [ 'READ' ], to : [ 'Vendor' ] },
 { grant : [ '*' ], to : [ 'ProcurementManager' ] } 
 ])as projection on officesupplies.Products;
 
};