import { checkAllForm } from "../formValidation";

export const submitFormData = (event: Event): void => {
  event.preventDefault();

  const form = event.target as HTMLFormElement;

  if (form != null) {
    if (checkAllForm(form)) {
      printFormData(form);
    }
  }
};

const printFormData = (form: HTMLFormElement): Record<string, string> | undefined => {
  const inputs = form.querySelectorAll("input");

  if (!inputs || inputs.length === 0) {
    return;
  }

  const data: Record<string, string> = Array.from(inputs).reduce((total: Record<string, string>, input) => {
    const { name } = input;
    total[name] = input.value;
    return total;
  }, {});

  console.log(data);  // eslint-disable-line no-console
};
