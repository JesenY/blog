document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        // 初始化表单状态
        formSuccess.style.display = 'none';
        
        // 表单验证
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            // 验证姓名
            const nameInput = document.getElementById('name');
            const nameError = document.getElementById('nameError');
            if (!nameInput.value.trim()) {
                nameError.textContent = '请输入您的姓名';
                nameInput.classList.add('error');
                isValid = false;
            } else {
                nameError.textContent = '';
                nameInput.classList.remove('error');
            }
            
            // 验证邮箱
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                emailError.textContent = '请输入您的邮箱';
                emailInput.classList.add('error');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value)) {
                emailError.textContent = '请输入有效的邮箱地址';
                emailInput.classList.add('error');
                isValid = false;
            } else {
                emailError.textContent = '';
                emailInput.classList.remove('error');
            }
            
            // 验证留言
            const messageInput = document.getElementById('message');
            const messageError = document.getElementById('messageError');
            if (!messageInput.value.trim()) {
                messageError.textContent = '请输入您的留言';
                messageInput.classList.add('error');
                isValid = false;
            } else {
                messageError.textContent = '';
                messageInput.classList.remove('error');
            }
            
            // 如果验证通过，模拟提交
            if (isValid) {
                // 这里应该是实际的表单提交逻辑
                // 例如使用fetch API发送数据到服务器
                
                // 模拟提交成功
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'none';
                    formSuccess.style.display = 'flex';
                    formSuccess.style.animation = 'fadeIn 0.5s ease';
                    
                    // 3秒后重置表单
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                        contactForm.style.display = 'block';
                        contactForm.style.animation = 'fadeIn 0.5s ease';
                    }, 3000);
                }, 1000);
            }
        });
        
        // 实时验证
        document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(input => {
            input.addEventListener('input', () => {
                const errorElement = document.getElementById(`${input.id}Error`);
                if (errorElement) {
                    errorElement.textContent = '';
                    input.classList.remove('error');
                }
            });
        });
    }
});