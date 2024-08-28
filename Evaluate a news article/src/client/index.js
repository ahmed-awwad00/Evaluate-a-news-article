import { handleSubmit } from './js/formHandler';

import './styles/base.scss';
import './styles/header.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/main.scss';

// Event listener to handle form submission
document.getElementById('form').addEventListener('submit', handleSubmit);
