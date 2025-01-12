import React from 'react'
import { AlertTriangle, FileText, Home, MessageCircle, Package, PlusCircle, ShoppingBag, Tag } from 'lucide-react';

export const SidebarVendedor = () => {
  return (
    <div class="col-md-2 bg-white p-4 border-end min-vh-100">
      <h2 class="fw-semibold mb-4">Principales</h2>

      <div class="d-flex flex-column gap-2">
        <a href="#" class="d-flex align-items-center text-secondary text-decoration-none hover-primary">
          <Package class="me-2" size={16} />
          <span>Productos</span>
        </a>
        <a href="#" class="d-flex align-items-center text-secondary text-decoration-none hover-primary">
          <Tag class="me-2" size={16} />
          <span>Subproductos</span>
        </a>
        <a href="#" class="d-flex align-items-center text-secondary text-decoration-none hover-primary">
          <Tag class="me-2" size={16} />
          <span>Descuentos</span>
        </a>
        <a href="#" class="d-flex align-items-center text-secondary text-decoration-none hover-primary">
          <MessageCircle class="me-2" size={16} />
          <span>Chats</span>
        </a>
        <a href="#" class="d-flex align-items-center text-secondary text-decoration-none hover-primary">
          <FileText class="me-2" size={16} />
          <span>Documentación</span>
        </a>
      </div>

      <h2 class="fw-semibold mt-5 mb-4">Ventas y logística</h2>
      <div class="d-flex flex-column gap-2">
        <a href="#" class="d-flex align-items-center text-secondary text-decoration-none hover-primary">
          <Home class="me-2" size={16} />
          <span>Ventas</span>
        </a>
        <a href="#" class="d-flex align-items-center text-secondary text-decoration-none hover-primary">
          <ShoppingBag class="me-2" size={16} />
          <span>Pedidos</span>
        </a>
        <a href="#" class="d-flex align-items-center text-secondary text-decoration-none hover-primary">
          <AlertTriangle class="me-2" size={16} />
          <span>Reclamos y quejas</span>
        </a>
      </div>
    </div>

  )
}
