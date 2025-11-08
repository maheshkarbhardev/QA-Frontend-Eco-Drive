import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Home, Package, Users, ShoppingCart, Menu } from "lucide-react";
import Logo from "../../assets/images/biofuel-logo.jpeg";

const AppSideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <SidebarProvider>
      <Sidebar className="border-r w-[280px] ">
        {/* Header: Logo + Hamburger */}
        <SidebarHeader className="flex items-center justify-between bg-[#c1121f] px-4 py-4 border-b">
          {!collapsed && (
            // <img src={Logo} alt="EcoDrive Logo" className="h-8 w-[10px]" />
            <span className="text-green-500 font-bold text-[20px] ">
              Eco-Drive
            </span>
          )}

          {/* <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </button> */}
        </SidebarHeader>

        {/* Sidebar Content */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* Home */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={isActive("/home")}
                    onClick={() => navigate("/home")}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    {/* {!collapsed && "Home"} */}
                    <span className="text-[16px] font-medium">Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Product Management */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={isActive("/productlist")}
                    onClick={() => navigate("/productlist")}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    {/* {!collapsed && "Product Management"} */}
                    <span className="text-[16px] font-medium">Product Management</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Customer Management */}
                <SidebarMenuItem>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="customers">
                      <AccordionTrigger className="flex items-center [&>svg]:rotate-0 [&>svg]:transition-none">
                        <Users className="mr-[5px] h-4 w-4" />
                        {/* {!collapsed && "Customer Management"} */}
                        <span className="text-[16px] font-medium">Customer Management</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        {!collapsed && (
                          <SidebarMenu>
                            <SidebarMenuItem>
                              <SidebarMenuButton
                                isActive={isActive("/customerlist")}
                                onClick={() => navigate("/customerlist")}
                                className="text-[16px] font-medium"
                              >
                                Customers
                              </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                              <SidebarMenuButton
                                isActive={isActive("/estimateList")}
                                onClick={() => navigate("/estimateList")}
                                className="text-[16px] font-medium"
                              >
                                Estimates
                              </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                              <SidebarMenuButton
                                isActive={isActive("/salesOrderList")}
                                onClick={() => navigate("/salesOrderList")}
                                className="text-[16px] font-medium"
                              >
                                Sales Order
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          </SidebarMenu>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </SidebarMenuItem>

                {/* Vendor Management */}
                <SidebarMenuItem>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="vendors">
                      <AccordionTrigger className="flex items-center [&>svg]:rotate-0 [&>svg]:transition-none">
                        <ShoppingCart className="mr-[5px] h-4 w-4" />
                        {/* {!collapsed && "Vendor Management"} */}
                        <span className="text-[16px] font-medium">Vendor Management</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        {!collapsed && (
                          <SidebarMenu>
                            <SidebarMenuItem>
                              <SidebarMenuButton
                                isActive={isActive("/vendorsList")}
                                onClick={() => navigate("/vendorsList")}
                                className="text-[16px] font-medium"
                              >
                                Vendors
                              </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                              <SidebarMenuButton
                                isActive={isActive("/vendorSelectionList")}
                                onClick={() => navigate("/vendorSelectionList")}
                                className="text-[16px] font-medium"
                              >
                                Vendor Selection
                              </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                              <SidebarMenuButton
                                isActive={isActive("/vendorPoList")}
                                onClick={() => navigate("/vendorPoList")}
                                className="text-[16px] font-medium"
                              >
                                Vendor PO
                              </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                              <SidebarMenuButton
                                isActive={isActive("/dispatchNotificationList")}
                                onClick={() =>
                                  navigate("/dispatchNotificationList")
                                }
                                className="text-[16px] font-medium"
                              >
                                Dispatch Notification
                              </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                              <SidebarMenuButton
                                isActive={isActive("/deliveryChallanList")}
                                onClick={() => navigate("/deliveryChallanList")}
                                className="text-[16px] font-medium"
                              >
                                Delivery Challan
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          </SidebarMenu>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export default AppSideBar;
