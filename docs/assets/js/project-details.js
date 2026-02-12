// 项目详情数据
const projectsData = {
    'automation-framework': {
        title: '现代自动化测试框架',
        date: '2024年1月-2024年4月',
        category: '自动化测试',
        description: '基于 Playwright 构建的现代化自动化测试框架，支持 Web、API 和移动应用测试，实现了测试用例的模块化和数据驱动。',
        tags: ['Playwright', 'Python', 'Pytest', 'Allure'],
        achievements: [
            '提升回归测试效率 70%',
            '测试覆盖率达 90%+',
            '减少手动测试工作量 85%',
            '建立可维护的Page Object模型框架'
        ],
        screenshots: [
            'assets/images/projects/automation-1.svg',
            'assets/images/projects/automation-2.svg'
        ]
    },
    'cicd-integration': {
        title: 'CI/CD 测试集成平台',
        date: '2023年8月-2023年11月',
        category: 'CI/CD',
        description: '将测试流程与 GitLab CI/CD 深度集成，实现代码提交自动触发测试，构建失败自动通知，测试报告自动生成的完整流程。',
        tags: ['GitLab CI', 'Jenkins', 'Docker', 'Kubernetes'],
        achievements: [
            '构建时间缩短 40%',
            '线上缺陷率降低 65%',
            '测试反馈时间减少 80%',
            '建立持续集成和持续测试的完整流程'
        ],
        screenshots: [
            'assets/images/projects/cicd-1.svg',
            'assets/images/projects/cicd-2.svg'
        ]
    },
    'performance-testing': {
        title: '分布式性能测试体系',
        date: '2023年1月-2023年3月',
        category: '性能测试',
        description: '基于 JMeter 构建的分布式性能测试体系，支持 10000+ 并发用户的压力测试，实现了测试场景的可视化设计和结果分析。',
        tags: ['JMeter', 'Grafana', 'Prometheus', 'InfluxDB'],
        achievements: [
            '系统响应时间降低 60%',
            '并发处理能力提升 300%',
            '资源利用率优化 40%',
            '建立持续性能监控体系'
        ],
        screenshots: [
            'assets/images/projects/performance-1.svg',
            'assets/images/projects/performance-2.svg'
        ]
    },
    'quality-platform': {
        title: '智能质量保障平台',
        date: '2024年5月-2024年8月',
        category: '质量保障',
        description: '整合自动化测试、性能测试、代码质量分析和缺陷管理的综合质量保障平台，提供一站式的质量监控和分析服务。',
        tags: ['SonarQube', 'Jira', 'Elasticsearch', 'Kibana'],
        achievements: [
            '质量问题发现提前 75%',
            '代码质量评分提升 35%',
            '团队质量意识显著增强',
            '建立全面的质量监控体系'
        ],
        screenshots: [
            'assets/images/projects/quality-1.svg',
            'assets/images/projects/quality-2.svg'
        ]
    }
};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 从URL获取项目ID
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    if (projectId && projectsData[projectId]) {
        const project = projectsData[projectId];
        
        // 渲染项目详情
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-date').textContent = project.date;
        document.getElementById('project-category').textContent = project.category;
        document.getElementById('project-description').textContent = project.description;
        
        // 渲染技术标签
        const tagsContainer = document.getElementById('project-tags');
        tagsContainer.innerHTML = project.tags.map(tag => 
            `<span class="project-tag">${tag}</span>`
        ).join('');
        
        // 渲染项目成果
        const achievementsList = document.getElementById('project-achievements');
        achievementsList.innerHTML = project.achievements.map(item => 
            `<li>${item}</li>`
        ).join('');
        
        // 渲染项目截图 (实际项目中需要准备这些图片)
        const screenshotsContainer = document.getElementById('project-screenshots');
        if (project.screenshots && project.screenshots.length > 0) {
            screenshotsContainer.innerHTML = project.screenshots.map(img => 
                `<div class="gallery-item">
                    <img src="${img}" alt="${project.title}截图" class="gallery-img">
                    <div class="gallery-overlay">
                        <i data-phosphor="magnifying-glass-plus" class="ph-magnifying-glass-plus"></i>
                    </div>
                </div>`
            ).join('');
            
            // 添加图片点击预览功能
            document.querySelectorAll('.gallery-img').forEach(img => {
                img.addEventListener('click', function() {
                    const modal = document.createElement('div');
                    modal.className = 'image-modal';
                    modal.innerHTML = `
                        <div class="modal-content">
                            <span class="close-modal">&times;</span>
                            <img src="${this.src}" alt="${this.alt}">
                        </div>
                    `;
                    document.body.appendChild(modal);
                    
                    modal.querySelector('.close-modal').addEventListener('click', function() {
                        modal.remove();
                    });
                    
                    modal.addEventListener('click', function(e) {
                        if (e.target === modal) {
                            modal.remove();
                        }
                    });
                });
            });
        } else {
            screenshotsContainer.innerHTML = '<p>暂无项目截图</p>';
        }
    } else {
        // 项目ID无效的处理
        document.querySelector('.project-details').innerHTML = `
            <h1>项目未找到</h1>
            <p>请求的项目不存在或已被移除。</p>
            <a href="index.html#projects" class="back-btn">
                <i data-phosphor="arrow-left" class="ph-arrow-left"></i> 返回项目列表
            </a>
        `;
    }
});