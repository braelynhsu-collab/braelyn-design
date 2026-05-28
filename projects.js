class ProjectsLoader {
  constructor() {
    this.projects = [];
    this.container = null;
    this.init();
  }

  async init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.loadProjects());
    } else {
      await this.loadProjects();
    }
  }

  async loadProjects() {
    try {
      const response = await fetch('projects.json?_t=' + Date.now());
      if (!response.ok) {
        throw new Error('无法加载项目数据');
      }
      
      this.projects = await response.json();
      this.container = document.querySelector('.projects-list');
      
      if (!this.container) {
        console.error('未找到项目容器 .projects-list');
        return;
      }

      this.container.innerHTML = '';
      this.renderProjects();
      this.initInteractions();
      
    } catch (error) {
      console.error('加载项目失败:', error);
      this.showError('加载项目数据失败，请刷新页面重试。');
    }
  }

  renderProjects() {
    const sortedProjects = [...this.projects].sort((a, b) => b.year - a.year);
    
    sortedProjects.forEach(project => {
      const projectElement = this.createProjectElement(project);
      this.container.appendChild(projectElement);
    });
  }

  createProjectElement(project) {
    const div = document.createElement('div');
    div.className = `project-item ${project.fullWidth ? 'full-width' : ''}`;
    div.dataset.year = project.year;
    div.dataset.category = project.category;
    
    div.innerHTML = `
      <a href="${project.url}" style="text-decoration:none; color:inherit;">
        <div class="project-img-wrapper">
          <img src="${project.coverImage}" style="aspect-ratio:${project.aspectRatio};" alt="${project.title.en}">
        </div>
        <div class="project-info">
          <h3 class="project-name">
            <span class="project-title-cn">${project.title.cn}</span>
            <span class="project-title-en">${project.title.en}</span>
          </h3>
          <div class="project-meta">
            <div class="project-tag">${project.category}</div>
            <div class="project-year">${project.year}</div>
          </div>
        </div>
      </a>
    `;
    
    return div;
  }

  initInteractions() {
    const cursor = document.getElementById('cursor');
    if (cursor) {
      const interactiveElements = document.querySelectorAll('.project-img-wrapper, a, .theme-toggle');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
      });
    }
  }

  showError(message) {
    if (this.container) {
      this.container.innerHTML = `
        <div style="text-align: center; padding: 4rem 2rem; color: var(--text);">
          <p>${message}</p>
        </div>
      `;
    }
  }

  addProject(projectData) {
    const requiredFields = ['id', 'title', 'category', 'year', 'coverImage', 'url'];
    const missingFields = requiredFields.filter(field => !projectData[field]);
    
    if (missingFields.length > 0) {
      console.error('缺少必要字段:', missingFields);
      return false;
    }

    if (this.projects.some(p => p.id === projectData.id)) {
      console.error('项目ID已存在:', projectData.id);
      return false;
    }

    this.projects.push(projectData);
    this.renderProjects();
    this.initInteractions();
    
    return true;
  }

  removeProject(projectId) {
    const index = this.projects.findIndex(p => p.id === projectId);
    if (index === -1) {
      console.error('未找到项目:', projectId);
      return false;
    }

    this.projects.splice(index, 1);
    this.renderProjects();
    this.initInteractions();
    
    return true;
  }

  updateProject(projectId, updates) {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) {
      console.error('未找到项目:', projectId);
      return false;
    }

    Object.assign(project, updates);
    this.renderProjects();
    this.initInteractions();
    
    return true;
  }

  getAllProjects() {
    return [...this.projects];
  }

  filterByYear(year) {
    return this.projects.filter(p => p.year === year);
  }

  filterByCategory(category) {
    return this.projects.filter(p => p.category === category);
  }
}

const projectsLoader = new ProjectsLoader();
window.projectsLoader = projectsLoader;