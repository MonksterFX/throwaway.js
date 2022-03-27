// https://dev.to/koddr/vue-3-error-with-using-typescript-property-x-does-not-exist-on-type-eventtarget-5cpl
export const handleInputChange = (event: Event) =>
  (event.target as HTMLInputElement).value;
