import {action, computed, makeObservable, observable} from 'mobx';
import {Service, ServiceCategory} from '../types/services';
import {servicesMock} from '../data/mocks';

class ServicesStore {
  serviceCategories = Object.values(ServiceCategory);
  @observable private _filter: Partial<Record<ServiceCategory, string>> = {};
  @computed get filter(): string {
    if (this.selectedCategory) {
      return this._filter[this.selectedCategory] ?? '';
    } else {
      return '';
    }
  }
  @action.bound setFilter(filter: string) {
    if (this.selectedCategory) {
      this._filter[this.selectedCategory] = filter;
    }
  }
  @observable selectedCategory: ServiceCategory | null = null;

  @action.bound selectCategory(category: ServiceCategory | null) {
    this.selectedCategory = category;
  }

  private _isMatchFilter(value: string) {
    return value.toLowerCase().includes(this.filter.toLowerCase());
  }
  private _isServiceMatchFilters({name, description, price}: Service) {
    return [name, description, price].some(field => this._isMatchFilter(field));
  }

  @computed get searchError() {
    return !this.filteredServices.length;
  }

  @computed get filteredServices() {
    if (this.selectedCategory) {
      return this.services.filter(service => {
        const isSelectedCategory = service.category === this.selectedCategory;
        const isMatchFilters = this._filter
          ? this._isServiceMatchFilters(service)
          : true;
        return isSelectedCategory && isMatchFilters;
      });
    }
    return this.services;
  }
  services: Service[] = servicesMock;
  constructor() {
    makeObservable(this);
  }
}

export const servicesStore = new ServicesStore();
