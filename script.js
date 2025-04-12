const container = document.getElementById('container');
    const resetButton = document.getElementById('reset');
    let form; // Global form reference

    //RandomColor logic whith proigressive darkening effect
    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`
    }

    // Reusable hover effect logic
    function bindHoverEffect(cell) {
        let hoverCount = 0;
        let baseColor;
      
        cell.addEventListener("mouseover", () => {
          hoverCount++;
      
          if (hoverCount === 1) {
            // First hover = assign random color
            baseColor = getRandomColor();
            cell.style.backgroundColor = baseColor;
            cell.style.opacity = 1;
          } else {
            // Progressive darkening
            const currentOpacity = parseFloat(cell.style.opacity) || 1;
            if (currentOpacity > 0.1) {
              cell.style.opacity = currentOpacity - 0.1;
            }
          }
        });
      }
    // Creates the grid
    function createGrid(gridSize) {
      container.innerHTML = ''; // Clear old grid

      const total = gridSize * gridSize;

      for (let i = 0; i < total; i++) {
        const div = document.createElement('div');
        div.classList.add("grid");
        div.style.width = `calc(100% / ${gridSize})`;
        div.style.height = `calc(100% / ${gridSize})`;        
        bindHoverEffect(div);
        container.appendChild(div);
      }
    }

    // Create a popup form to change grid size
    function createGridPopup(defaultSize) {
      form = document.createElement('form');

      const gridInput = document.createElement('input');
      gridInput.type = 'number';
      gridInput.name = 'grid-size';
      gridInput.placeholder = 'Enter grid size (1-100)';
      gridInput.value = defaultSize;
      gridInput.min = 1;
      gridInput.max = 100;

      const submitButton = document.createElement('button');
      submitButton.type = 'submit';
      submitButton.textContent = 'Set Grid Size';

      const cancelButton = document.createElement('button');
      cancelButton.type = 'button';
      cancelButton.textContent = 'Cancel';
      cancelButton.addEventListener('click', () => {
        document.body.removeChild(form);
      });

      form.appendChild(gridInput);
      form.appendChild(submitButton);
      form.appendChild(cancelButton);

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const value = parseInt(gridInput.value.trim(), 10);
        if (isNaN(value) || value < 1 || value > 100) {
          alert('Please enter a valid number between 1 and 100.');
          return;
        }
        createGrid(value);
        document.body.removeChild(form);
      });

      document.body.appendChild(form);
    }

    // Set default grid on load
    createGrid(16);

    // Show popup on reset click
    resetButton.addEventListener('click', () => {
      if (!document.body.contains(form)) {
        createGridPopup(16);
      }
    });